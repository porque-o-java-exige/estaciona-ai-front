import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, forkJoin, of, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  AUTH_TOKEN_STORAGE_KEY,
  AUTH_USER_ID_STORAGE_KEY,
} from '../interceptors/auth.interceptor';
import {
  DriverRatingSummaryDto,
  GarageResponseDto,
  LoginResponseDto,
  UserRequestDto,
  UserResponseDto,
  VehicleRequestDto,
  VehicleResponseDto,
} from '../interfaces/api.interface';
import {
  SignInRequest,
  UserGarage,
  UserRequest,
  UserResponse,
  UserSettings,
  UserVehicle,
} from '../interfaces/user.interface';

const DEFAULT_USER: UserResponse = {
  id: 'usr-01',
  name: 'Kookie Piska',
  email: 'kookiepiska@email.com',
  phone: '5511988887777',
  avatarUrl: 'assets/images/png/kookie-piska-avatar.png',
  balance: 23.5,
  rating: 4.9,
  totalReviews: 400,
  totalBookingsCount: 69,
  cardDisplay: 'Cartão ****** 4812 visa',
  isVerified: true,
};

const INITIAL_VEHICLES: UserVehicle[] = [
  {
    id: 'veh-01',
    model: '2023 Tesla Model Y',
    licensePlate: 'HB20 ABC - 1A23',
    isPrimary: true,
    brand: 'Tesla',
    year: 2023,
    color: 'Branco',
  },
  {
    id: 'veh-02',
    model: '2049 Honda civic',
    licensePlate: 'AKBI DKH - 123',
    isPrimary: false,
    brand: 'Honda',
    year: 2049,
    color: 'Prata',
  },
];

const INITIAL_GARAGES: UserGarage[] = [
  {
    id: 'own-gar-01',
    name: 'jude bellingham',
    address: 'inglaterra 2 x 0 argentina',
    pricePerHour: 8.0,
    monthlyEarnings: 846.5,
    totalBookings: 23,
    isActive: true,
    imageUrl: 'assets/images/png/garage-tesla.png',
    imageUrls: ['assets/images/png/garage-tesla.png'],
  },
];

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient, { optional: true });
  private readonly apiUrl = environment.apiUrl;

  currentUser = signal<UserResponse>(DEFAULT_USER);
  isAuthenticated = computed(() => Boolean(this.currentUser()));

  vehicles = signal<UserVehicle[]>(INITIAL_VEHICLES);
  ownedGarages = signal<UserGarage[]>(INITIAL_GARAGES);
  settings = signal<UserSettings>({
    darkMode: false,
    notifications: true,
    ptBrLanguage: true,
  });

  primaryVehicle = computed(
    () => this.vehicles().find((vehicle) => vehicle.isPrimary) ?? this.vehicles()[0]
  );

  constructor() {
    const savedToken = this.getStorageItem(AUTH_TOKEN_STORAGE_KEY);
    const savedUserId = this.getStorageItem(AUTH_USER_ID_STORAGE_KEY);
    if (savedToken && savedUserId && UUID_REGEX.test(savedUserId)) {
      this.loadAuthenticatedUserData(savedUserId);
    }
  }

  signIn = (credentials: SignInRequest): boolean => {
    const email = credentials.email.trim();
    const password = credentials.password.trim();
    if (!email || !password) {
      return false;
    }

    this.currentUser.update((prev) => ({
      ...prev,
      email,
    }));

    if (this.http) {
      this.http
        .post<LoginResponseDto>(`${this.apiUrl}/auth/login`, { email, password })
        .pipe(
          tap((res) => {
            this.setStorageItem(AUTH_TOKEN_STORAGE_KEY, res.token);
            this.setStorageItem(AUTH_USER_ID_STORAGE_KEY, res.userId);
            this.currentUser.update((prev) => ({
              ...prev,
              id: res.userId,
              name: res.name || prev.name,
              email: res.email || prev.email,
            }));
            this.loadAuthenticatedUserData(res.userId);
          }),
          catchError(() => of(null))
        )
        .subscribe();
    }

    return true;
  };

  signUp = (payload: UserRequest): boolean => {
    const name = payload.name.trim();
    const email = payload.email.trim();
    const password = payload.password.trim();
    const phone = payload.phone.trim();

    if (!name || !email || !password) {
      return false;
    }

    this.currentUser.set({
      ...DEFAULT_USER,
      name,
      email,
      phone,
    });

    if (this.http) {
      const requestBody: UserRequestDto = {
        name,
        email,
        password,
        phoneNumber: phone || '11999999999',
      };

      this.http
        .post<UserResponseDto>(`${this.apiUrl}/users`, requestBody)
        .pipe(
          switchMap((createdUser) =>
            this.http!
              .post<LoginResponseDto>(`${this.apiUrl}/auth/login`, { email, password })
              .pipe(
                tap((loginRes) => {
                  this.setStorageItem(AUTH_TOKEN_STORAGE_KEY, loginRes.token);
                  this.setStorageItem(AUTH_USER_ID_STORAGE_KEY, loginRes.userId);
                  this.currentUser.update((prev) => ({
                    ...prev,
                    id: createdUser.id,
                    name: createdUser.name,
                    email: createdUser.email,
                    phone: createdUser.phoneNumber || prev.phone,
                    avatarUrl: createdUser.photoUrl || prev.avatarUrl,
                  }));
                  this.loadAuthenticatedUserData(createdUser.id);
                })
              )
          ),
          catchError(() => of(null))
        )
        .subscribe();
    }

    return true;
  };

  signInWithGoogle = (): boolean => {
    this.currentUser.set(DEFAULT_USER);
    return true;
  };

  logout = (): void => {
    if (this.http && this.getStorageItem(AUTH_TOKEN_STORAGE_KEY)) {
      this.http
        .post<void>(`${this.apiUrl}/auth/logout`, {})
        .pipe(catchError(() => of(null)))
        .subscribe();
    }
    this.removeStorageItem(AUTH_TOKEN_STORAGE_KEY);
    this.removeStorageItem(AUTH_USER_ID_STORAGE_KEY);
  };

  loadAuthenticatedUserData = (userId: string): void => {
    if (!this.http || !UUID_REGEX.test(userId)) {
      return;
    }

    forkJoin({
      user: this.http
        .get<UserResponseDto>(`${this.apiUrl}/users/${userId}`)
        .pipe(catchError(() => of(null))),
      rating: this.http
        .get<DriverRatingSummaryDto>(`${this.apiUrl}/drivers/${userId}/rating`)
        .pipe(catchError(() => of(null))),
      vehicles: this.http
        .get<VehicleResponseDto[]>(`${this.apiUrl}/vehicles`)
        .pipe(catchError(() => of(null))),
      garages: this.http
        .get<GarageResponseDto[]>(`${this.apiUrl}/garages/owner`)
        .pipe(catchError(() => of(null))),
    }).subscribe(({ user, rating, vehicles, garages }) => {
      if (user) {
        this.currentUser.update((prev) => ({
          ...prev,
          id: user.id,
          name: user.name || prev.name,
          email: user.email || prev.email,
          phone: user.phoneNumber || prev.phone,
          avatarUrl: user.photoUrl || prev.avatarUrl,
          rating:
            rating?.averageRating != null
              ? Number(rating.averageRating.toFixed(1))
              : prev.rating,
          totalReviews:
            rating?.totalReviews != null ? rating.totalReviews : prev.totalReviews,
        }));
      }

      if (vehicles && vehicles.length > 0) {
        this.vehicles.set(
          vehicles.map((v, idx) => ({
            id: v.id,
            brand: v.brand,
            year: v.year,
            color: v.color,
            model: `${v.year} ${v.brand} ${v.model}`.trim(),
            licensePlate: v.licensePlate,
            isPrimary: idx === 0,
          }))
        );
      }

      if (garages && garages.length > 0) {
        this.ownedGarages.set(
          garages.map((g) => {
            const cover = g.coverImageUrl || 'assets/images/png/garage-tesla.png';
            const gallery = g.images && g.images.length > 0 ? g.images : [cover];
            return {
              id: g.garageId,
              name: g.name,
              address: g.address,
              pricePerHour: Number(g.pricePerHour ?? g.price ?? 10),
              monthlyEarnings: 0,
              totalBookings: 0,
              isActive: Boolean(g.available),
              imageUrl: cover,
              imageUrls: gallery,
            };
          })
        );
      }
    });
  };

  updateProfile = (payload: {
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
    avatarFile?: File;
  }): void => {
    const cleanName = payload.name.trim();
    const cleanEmail = payload.email.trim();
    if (!cleanName || !cleanEmail) {
      return;
    }
    this.currentUser.update((prev) => ({
      ...prev,
      name: cleanName,
      email: cleanEmail,
      phone: payload.phone.trim() || prev.phone,
      avatarUrl: payload.avatarUrl?.trim() || prev.avatarUrl,
    }));

    const userId = this.currentUser().id;
    if (this.http && UUID_REGEX.test(userId)) {
      if (payload.avatarFile) {
        const formData = new FormData();
        formData.append('file', payload.avatarFile);
        this.http
          .patch<UserResponseDto>(`${this.apiUrl}/users/${userId}/photo`, formData)
          .pipe(
            tap((updated) => {
              if (updated.photoUrl) {
                this.currentUser.update((prev) => ({
                  ...prev,
                  avatarUrl: updated.photoUrl!,
                }));
              }
            }),
            catchError(() => of(null))
          )
          .subscribe();
      }
    }
  };

  rechargeWallet = (amount: number): void => {
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }
    this.currentUser.update((prev) => ({
      ...prev,
      balance: Number((prev.balance + amount).toFixed(2)),
    }));
  };

  addVehicle = (payload: {
    brand?: string;
    model: string;
    year?: number;
    color?: string;
    licensePlate: string;
    isPrimary: boolean;
  }): void => {
    const cleanModel = payload.model.trim();
    const cleanPlate = payload.licensePlate.trim().toUpperCase();
    if (!cleanModel || !cleanPlate) {
      return;
    }

    const cleanBrand = payload.brand?.trim() ?? '';
    const displayModel = cleanBrand
      ? `${payload.year ?? new Date().getFullYear()} ${cleanBrand} ${cleanModel}`.trim()
      : cleanModel;

    const tempId = `veh-${Date.now()}`;
    const newVehicle: UserVehicle = {
      id: tempId,
      brand: cleanBrand || undefined,
      year: payload.year,
      color: payload.color?.trim() || undefined,
      model: displayModel,
      licensePlate: cleanPlate,
      isPrimary: payload.isPrimary || this.vehicles().length === 0,
    };

    this.vehicles.update((list) => {
      const updated = newVehicle.isPrimary
        ? list.map((item) => ({ ...item, isPrimary: false }))
        : list;
      return [...updated, newVehicle];
    });

    if (this.http && this.getStorageItem(AUTH_TOKEN_STORAGE_KEY)) {
      const normalizedPlate = cleanPlate.replace(/[^A-Z0-9]/g, '');
      const vehicleReq: VehicleRequestDto = {
        licensePlate: normalizedPlate,
        year: payload.year ?? new Date().getFullYear(),
        brand: (cleanBrand || 'TOYOTA').toUpperCase(),
        model: cleanModel.toUpperCase(),
        color: (payload.color?.trim() || 'BLACK').toUpperCase(),
      };

      this.http
        .post<VehicleResponseDto>(`${this.apiUrl}/vehicles`, vehicleReq)
        .pipe(
          tap((saved) => {
            this.vehicles.update((list) =>
              list.map((v) =>
                v.id === tempId
                  ? {
                      ...v,
                      id: saved.id,
                      licensePlate: saved.licensePlate,
                    }
                  : v
              )
            );
          }),
          catchError(() => of(null))
        )
        .subscribe();
    }
  };

  setPrimaryVehicle = (vehicleId: string): void => {
    this.vehicles.update((list) =>
      list.map((item) => ({
        ...item,
        isPrimary: item.id === vehicleId,
      }))
    );
  };

  addOwnedGarage = (payload: {
    name: string;
    address: string;
    pricePerHour: number;
    imageUrls: string[];
  }): void => {
    const cleanName = payload.name.trim();
    const cleanAddress = payload.address.trim();
    const imageUrls = payload.imageUrls.filter((imageUrl) => imageUrl.trim().length > 0);
    if (!cleanName || !cleanAddress || imageUrls.length === 0) {
      return;
    }

    const newGarage: UserGarage = {
      id: `own-gar-${Date.now()}`,
      name: cleanName,
      address: cleanAddress,
      pricePerHour: payload.pricePerHour > 0 ? payload.pricePerHour : 10,
      monthlyEarnings: 0,
      totalBookings: 0,
      isActive: true,
      imageUrl: imageUrls[0],
      imageUrls,
    };

    this.ownedGarages.update((list) => [...list, newGarage]);
  };

  toggleSetting = (key: keyof UserSettings): void => {
    this.settings.update((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  private getStorageItem(key: string): string | null {
    try {
      return typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem(key)
        : null;
    } catch {
      return null;
    }
  }

  private setStorageItem(key: string, value: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch {
      // Ignore storage errors
    }
  }

  private removeStorageItem(key: string): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch {
      // Ignore storage errors
    }
  }
}
