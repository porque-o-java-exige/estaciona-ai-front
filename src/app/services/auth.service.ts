import { computed, Injectable, signal } from '@angular/core';
import {
  SignInRequest,
  UserGarage,
  UserRequest,
  UserResponse,
  UserSettings,
  UserVehicle,
  UserVehicleType,
} from '../interfaces/user.interface';

const DEFAULT_USER: UserResponse = {
  id: 'usr-01',
  name: 'Lucas Ferreira',
  email: 'lucas.ferreira@email.com',
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
    brand: 'Tesla',
    year: 2023,
    color: 'Branco',
    licensePlate: 'BRA2E19',
    vehicleType: 'suv',
    verificationStatus: 'pending',
    isPrimary: true,
  },
  {
    id: 'veh-02',
    model: '2024 Honda civic',
    brand: 'Honda',
    year: 2024,
    color: 'Preto',
    licensePlate: 'ABC1234',
    vehicleType: 'small-car',
    verificationStatus: 'pending',
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
    imageUrl: 'assets/images/png/garage-tesla.png',
    imageUrls: ['assets/images/png/garage-tesla.png'],
  },
];

const DARK_MODE_STORAGE_KEY = 'estaciona-ai-dark-mode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<UserResponse>(DEFAULT_USER);
  isAuthenticated = computed(() => Boolean(this.currentUser()));

  vehicles = signal<UserVehicle[]>(INITIAL_VEHICLES);
  ownedGarages = signal<UserGarage[]>(INITIAL_GARAGES);
  settings = signal<UserSettings>({
    darkMode: this.readDarkModePreference(),
    notifications: true,
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

  updateProfile = (payload: {
    name: string;
    email: string;
    phone: string;
    avatarUrl?: string;
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
    model: string;
    brand: string;
    year: number;
    color: string;
    licensePlate: string;
    vehicleType: UserVehicleType;
    isPrimary: boolean;
  }): void => {
    const cleanModel = payload.model.trim();
    const cleanBrand = payload.brand.trim();
    const cleanColor = payload.color.trim();
    const cleanPlate = payload.licensePlate.trim().toUpperCase();
    if (!cleanModel || !cleanBrand || !cleanColor || !payload.year || !cleanPlate) {
      return;
    }

    const newVehicle: UserVehicle = {
      id: `veh-${Date.now()}`,
      model: cleanModel,
      brand: cleanBrand,
      year: payload.year,
      color: cleanColor,
      licensePlate: cleanPlate,
      vehicleType: payload.vehicleType,
      verificationStatus: 'pending',
      isPrimary: payload.isPrimary || this.vehicles().length === 0,
    };

    this.vehicles.update((list) => {
      const updated = newVehicle.isPrimary
        ? list.map((item) => ({ ...item, isPrimary: false }))
        : list;
      return [...updated, newVehicle];
    });
  };

  updateVehicle = (
    vehicleId: string,
    payload: Omit<UserVehicle, 'id' | 'verificationStatus'>,
  ): void => {
    const cleanModel = payload.model.trim();
    const cleanBrand = payload.brand.trim();
    const cleanColor = payload.color.trim();
    const cleanPlate = payload.licensePlate.trim().toUpperCase();
    if (!cleanModel || !cleanBrand || !cleanColor || !payload.year || !cleanPlate) {
      return;
    }

    this.vehicles.update((list) => {
      const currentVehicle = list.find((vehicle) => vehicle.id === vehicleId);
      if (!currentVehicle) {
        return list;
      }

      const updatedVehicle: UserVehicle = {
        ...currentVehicle,
        ...payload,
        model: cleanModel,
        brand: cleanBrand,
        color: cleanColor,
        licensePlate: cleanPlate,
        verificationStatus:
          cleanPlate === currentVehicle.licensePlate ? currentVehicle.verificationStatus : 'pending',
      };

      return updatedVehicle.isPrimary
        ? list.map((vehicle) =>
            vehicle.id === vehicleId ? updatedVehicle : { ...vehicle, isPrimary: false },
          )
        : list.map((vehicle) => (vehicle.id === vehicleId ? updatedVehicle : vehicle));
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

  setVehicleVerificationStatus = (
    vehicleId: string,
    verificationStatus: UserVehicle['verificationStatus'],
  ): void => {
    this.vehicles.update((list) =>
      list.map((vehicle) =>
        vehicle.id === vehicleId ? { ...vehicle, verificationStatus } : vehicle,
      ),
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

    if (key === 'darkMode' && typeof window !== 'undefined') {
      window.localStorage.setItem(DARK_MODE_STORAGE_KEY, String(this.settings().darkMode));
    }
  };

  private readDarkModePreference(): boolean {
    return (
      typeof window !== 'undefined' &&
      window.localStorage.getItem(DARK_MODE_STORAGE_KEY) === 'true'
    );
  }
}
