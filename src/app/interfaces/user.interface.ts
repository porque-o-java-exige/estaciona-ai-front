export interface UserRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface UserVehicle {
  id: string;
  model: string;
  licensePlate: string;
  isPrimary: boolean;
}

export interface UserGarage {
  id: string;
  name: string;
  address: string;
  pricePerHour: number;
  monthlyEarnings: number;
  totalBookings: number;
  isActive: boolean;
  imageUrl: string;
}

export interface UserSettings {
  darkMode: boolean;
  notifications: boolean;
  ptBrLanguage: boolean;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  balance: number;
  rating: number;
  totalReviews: number;
  totalBookingsCount: number;
  cardDisplay: string;
  isVerified: boolean;
}
