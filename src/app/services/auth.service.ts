import { computed, Injectable, signal } from '@angular/core';
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
  avatarUrl: 'assets/images/profile-avatar.png',
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
  },
  {
    id: 'veh-02',
    model: '2049 Honda civic',
    licensePlate: 'AKBI DKH - 123',
    isPrimary: false,
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
    imageUrl: 'assets/images/garage-main.png',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

  signIn = (credentials: SignInRequest): boolean => {
    if (!credentials.email.trim() || !credentials.password.trim()) {
      return false;
    }

    this.currentUser.update((prev) => ({
      ...prev,
      email: credentials.email.trim(),
    }));
    return true;
  };

  signUp = (payload: UserRequest): boolean => {
    if (!payload.name.trim() || !payload.email.trim() || !payload.password.trim()) {
      return false;
    }

    this.currentUser.set({
      ...DEFAULT_USER,
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
    });
    return true;
  };

  signInWithGoogle = (): boolean => {
    this.currentUser.set(DEFAULT_USER);
    return true;
  };

  updateProfile = (payload: { name: string; email: string; phone: string }): void => {
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
    }));
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

  addVehicle = (payload: { model: string; licensePlate: string; isPrimary: boolean }): void => {
    const cleanModel = payload.model.trim();
    const cleanPlate = payload.licensePlate.trim().toUpperCase();
    if (!cleanModel || !cleanPlate) {
      return;
    }

    const newVehicle: UserVehicle = {
      id: `veh-${Date.now()}`,
      model: cleanModel,
      licensePlate: cleanPlate,
      isPrimary: payload.isPrimary || this.vehicles().length === 0,
    };

    this.vehicles.update((list) => {
      const updated = newVehicle.isPrimary
        ? list.map((item) => ({ ...item, isPrimary: false }))
        : list;
      return [...updated, newVehicle];
    });
  };

  setPrimaryVehicle = (vehicleId: string): void => {
    this.vehicles.update((list) =>
      list.map((item) => ({
        ...item,
        isPrimary: item.id === vehicleId,
      }))
    );
  };

  addOwnedGarage = (payload: { name: string; address: string; pricePerHour: number }): void => {
    const cleanName = payload.name.trim();
    const cleanAddress = payload.address.trim();
    if (!cleanName || !cleanAddress) {
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
      imageUrl: 'assets/images/garage-alt.png',
    };

    this.ownedGarages.update((list) => [...list, newGarage]);
  };

  toggleSetting = (key: keyof UserSettings): void => {
    this.settings.update((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
}
