import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AUTH_TOKEN_STORAGE_KEY } from '../interceptors/auth.interceptor';
import {
  BillingMode,
  BookingFilter,
  BookingItem,
  BookingRequestDto,
  BookingResponseDto,
  BookingStatus,
  GarageItem,
  PaymentMethodType,
} from '../interfaces';
import { AuthService } from './auth.service';
import { GarageService } from './garage.service';

const INITIAL_BOOKINGS: BookingItem[] = [
  {
    id: 'res-paulista-900',
    garageId: 'garagem-paulista-prime',
    garageName: 'Estacionamento Central Paulista',
    address: 'Av. paulista, 900',
    dateTimeRange: '08/06 · 19:00–21:00',
    spotCode: 'C03 · Nível 1',
    status: 'Ativo',
    totalAmount: 24,
    distanceMeters: '120m',
    billingLabel: 'Hora',
    imageUrl: 'assets/images/png/garage-interior.png',
  },
  {
    id: 'res-frei-caneca-1',
    garageId: 'spot-frei-caneca',
    garageName: 'Shopping Frei Caneca P2',
    address: 'Shopping Frei Caneca P2',
    dateTimeRange: '08/06 · 19:00–21:00',
    spotCode: 'C03 · Nível 1',
    status: 'Em andamento',
    totalAmount: 24,
    distanceMeters: '180m',
    billingLabel: 'Hora',
    imageUrl: 'assets/images/png/garage-interior.png',
  },
  {
    id: 'res-frei-caneca-2',
    garageId: 'spot-frei-caneca',
    garageName: 'Shopping Frei Caneca P2',
    address: 'Shopping Frei Caneca P2',
    dateTimeRange: '08/06 · 19:00–21:00',
    spotCode: 'C03 · Nível 1',
    status: 'Concluído',
    totalAmount: 24,
    distanceMeters: '180m',
    billingLabel: 'Hora',
    imageUrl: 'assets/images/png/garage-interior.png',
  },
  {
    id: 'res-jardins-1',
    garageId: 'vaga-jardins-residence',
    garageName: 'Vaga Jardins Residence',
    address: 'Alameda Santos, 1420',
    dateTimeRange: '06/06 · 14:00–18:00',
    spotCode: 'B12 · Subsolo 1',
    status: 'Concluído',
    totalAmount: 32,
    distanceMeters: '210m',
    billingLabel: 'Hora',
    imageUrl: 'assets/images/png/garage-tesla.png',
  },
  {
    id: 'res-masp-center',
    garageId: 'estaciona-masp-center',
    garageName: 'Estaciona MASP Center',
    address: 'Rua Carlos Comenale, 85',
    dateTimeRange: '04/06 · 09:00–12:00',
    spotCode: 'A07 · Térreo',
    status: 'Concluído',
    totalAmount: 24,
    distanceMeters: '150m',
    billingLabel: 'Hora',
    imageUrl: 'assets/images/png/garage-outdoor.png',
  },
  {
    id: 'res-trianon-vip',
    garageId: 'garagem-trianon-vip',
    garageName: 'Garagem Trianon VIP',
    address: 'Alameda Jaú, 1190',
    dateTimeRange: '10/06 · 08:00–18:00',
    spotCode: 'D04 · Nível 1',
    status: 'Ativo',
    totalAmount: 30,
    distanceMeters: '250m',
    billingLabel: 'Diária',
    imageUrl: 'assets/images/png/garage-interior.png',
  },
];

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly http = inject(HttpClient, { optional: true });
  private readonly authService = inject(AuthService);
  private readonly garageService = inject(GarageService);
  private readonly apiUrl = environment.apiUrl;

  readonly bookings = signal<BookingItem[]>(INITIAL_BOOKINGS);
  readonly activeFilter = signal<BookingFilter>('Todas');
  readonly selectedBookingId = signal<string>(INITIAL_BOOKINGS[0].id);

  readonly billingMode = signal<BillingMode>('day');
  readonly selectedDays = signal<number[]>([11, 14]);
  readonly selectedHours = signal<number>(2);
  readonly paymentMethod = signal<PaymentMethodType>('card');
  readonly walletBalance = computed(() => this.authService.currentUser().balance);

  readonly pixCode = signal<string>(
    '06465a4s654d32a13654r68a4s5d.pix.a3s21d68w4as54f23r1bv'
  );

  readonly filterOptions: BookingFilter[] = [
    'Todas',
    'Em andamento',
    'Concluidas',
    'Ativas',
  ];

  constructor() {
    this.loadMyBookingsFromApi();
  }

  readonly filteredBookings = computed(() => {
    const filter = this.activeFilter();
    const all = this.bookings();

    if (filter === 'Em andamento') {
      return all.filter((item) => item.status === 'Em andamento');
    }
    if (filter === 'Concluidas') {
      return all.filter((item) => item.status === 'Concluído');
    }
    if (filter === 'Ativas') {
      return all.filter((item) => item.status === 'Ativo');
    }
    return all;
  });

  readonly paymentCandidates = computed(() => this.bookings().slice(0, 4));

  readonly selectedBooking = computed(
    () =>
      this.bookings().find((item) => item.id === this.selectedBookingId()) ??
      this.bookings()[0]
  );

  readonly baseSubtotal = computed(() => {
    if (this.billingMode() === 'hour') {
      return this.selectedHours() * 8;
    }
    const daysCount = Math.max(1, this.selectedDays().length);
    return daysCount * 12;
  });

  readonly serviceFee = computed(() =>
    this.billingMode() === 'hour' ? 1.5 : 2.0
  );

  readonly discountAmount = computed(() =>
    this.billingMode() === 'hour' ? 5.0 : 0.0
  );

  readonly finalTotal = computed(() =>
    Math.max(
      0,
      this.baseSubtotal() + this.serviceFee() - this.discountAmount()
    )
  );

  loadMyBookingsFromApi = (): void => {
    if (!this.http || !this.hasAuthToken()) {
      return;
    }

    this.http
      .get<BookingResponseDto[]>(`${this.apiUrl}/bookings`)
      .pipe(
        tap((dtos) => {
          if (Array.isArray(dtos) && dtos.length > 0) {
            const mapped = dtos.map((dto) => this.mapDtoToBookingItem(dto));
            this.bookings.set(mapped);
            this.selectedBookingId.set(mapped[0].id);
          }
        }),
        catchError(() => of(null))
      )
      .subscribe();
  };

  setFilter = (filter: BookingFilter): void => {
    this.activeFilter.set(filter);
  };

  selectBooking = (id: string): void => {
    this.selectedBookingId.set(id);
  };

  setBillingMode = (mode: BillingMode): void => {
    this.billingMode.set(mode);
  };

  toggleCalendarDay = (day: number): void => {
    const current = this.selectedDays();
    if (current.includes(day)) {
      if (current.length > 1) {
        this.selectedDays.set(current.filter((d) => d !== day));
      }
    } else {
      this.selectedDays.set([...current, day].sort((a, b) => a - b));
    }
  };

  incrementHours = (): void => {
    this.selectedHours.update((h) => Math.min(24, h + 1));
  };

  decrementHours = (): void => {
    this.selectedHours.update((h) => Math.max(1, h - 1));
  };

  setPaymentMethod = (method: PaymentMethodType): void => {
    this.paymentMethod.set(method);
  };

  addBookingFromGarage = (garage: GarageItem): BookingItem => {
    const existing = this.bookings().find((b) => b.garageId === garage.id);
    if (existing) {
      this.selectedBookingId.set(existing.id);
      return existing;
    }

    const tempId = `res-${garage.id}`;
    const newBooking: BookingItem = {
      id: tempId,
      garageId: garage.id,
      garageName: garage.name,
      address: garage.address,
      dateTimeRange: 'Hoje · 19:00–21:00',
      spotCode: 'A01 · Nível 1',
      status: 'Em andamento',
      totalAmount: garage.hourlyPrice * 2,
      distanceMeters: garage.distance,
      billingLabel: 'Hora',
      imageUrl: garage.imageUrl,
    };

    this.bookings.update((list) => [newBooking, ...list]);
    this.selectedBookingId.set(newBooking.id);

    const primaryVehicle = this.authService.primaryVehicle();
    if (
      this.http &&
      this.hasAuthToken() &&
      UUID_REGEX.test(garage.id) &&
      primaryVehicle &&
      UUID_REGEX.test(primaryVehicle.id)
    ) {
      const start = new Date(Date.now() + 60 * 60 * 1000);
      const end = new Date(start.getTime() + this.selectedHours() * 60 * 60 * 1000);
      const requestBody: BookingRequestDto = {
        garageId: garage.id,
        vehicleId: primaryVehicle.id,
        bookingType: this.billingMode() === 'day' ? 'DAILY' : 'HOURLY',
        startDateTime: start.toISOString().slice(0, 19),
        endDateTime: end.toISOString().slice(0, 19),
      };

      this.http
        .post<BookingResponseDto>(`${this.apiUrl}/bookings`, requestBody)
        .pipe(
          tap((created) => {
            const mapped = this.mapDtoToBookingItem(created, garage);
            this.bookings.update((list) =>
              list.map((item) => (item.id === tempId ? mapped : item))
            );
            this.selectedBookingId.set(mapped.id);
          }),
          catchError(() => of(null))
        )
        .subscribe();
    }

    return newBooking;
  };

  cancelBooking = (bookingId: string): void => {
    if (this.http && this.hasAuthToken() && UUID_REGEX.test(bookingId)) {
      this.http
        .patch<BookingResponseDto>(`${this.apiUrl}/bookings/${bookingId}/cancel`, {})
        .pipe(
          tap(() => {
            this.bookings.update((list) =>
              list.filter((item) => item.id !== bookingId)
            );
          }),
          catchError(() => of(null))
        )
        .subscribe();
    }
  };

  markSelectedBookingPaid = (): void => {
    const activeId = this.selectedBookingId();
    this.bookings.update((list) =>
      list.map((item) =>
        item.id === activeId
          ? { ...item, status: 'Ativo', totalAmount: this.finalTotal() }
          : item
      )
    );
  };

  private mapDtoToBookingItem(
    dto: BookingResponseDto,
    knownGarage?: GarageItem
  ): BookingItem {
    const garage =
      knownGarage ?? this.garageService.getGarageById(dto.garageId);
    const statusMap: Record<BookingResponseDto['status'], BookingStatus> = {
      PENDING: 'Em andamento',
      CONFIRMED: 'Ativo',
      COMPLETED: 'Concluído',
      CANCELLED: 'Concluído',
    };

    return {
      id: dto.bookingId,
      garageId: dto.garageId,
      garageName: garage?.name ?? 'Garagem Estaciona.AI',
      address: garage?.address ?? 'São Paulo - SP',
      dateTimeRange: this.formatDateRange(dto.startDateTime, dto.endDateTime),
      spotCode: 'A01 · Nível 1',
      status: statusMap[dto.status] ?? 'Em andamento',
      totalAmount: Number(dto.totalAmount ?? 24),
      distanceMeters: garage?.distance ?? '200m',
      billingLabel: dto.bookingType === 'DAILY' ? 'Diária' : 'Hora',
      imageUrl: garage?.imageUrl ?? 'assets/images/png/garage-interior.png',
    };
  }

  private formatDateRange(startIso: string, endIso: string): string {
    const start = new Date(startIso);
    const end = new Date(endIso);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return 'Hoje · 19:00–21:00';
    }
    const day = String(start.getDate()).padStart(2, '0');
    const month = String(start.getMonth() + 1).padStart(2, '0');
    const startTime = `${String(start.getHours()).padStart(2, '0')}:${String(
      start.getMinutes()
    ).padStart(2, '0')}`;
    const endTime = `${String(end.getHours()).padStart(2, '0')}:${String(
      end.getMinutes()
    ).padStart(2, '0')}`;
    return `${day}/${month} · ${startTime}–${endTime}`;
  }

  private hasAuthToken(): boolean {
    try {
      return (
        typeof window !== 'undefined' &&
        Boolean(window.localStorage?.getItem(AUTH_TOKEN_STORAGE_KEY))
      );
    } catch {
      return false;
    }
  }
}
