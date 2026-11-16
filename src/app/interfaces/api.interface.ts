export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  tokenType: string;
  userId: string;
  name: string;
  email: string;
}

export interface UserRequestDto {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  photoUrl: string | null;
}

export interface DriverRatingSummaryDto {
  driverId: string;
  averageRating: number | null;
  totalReviews: number | null;
}

export interface VehicleRequestDto {
  licensePlate: string;
  year: number;
  brand: string;
  model: string;
  color: string;
}

export interface VehicleResponseDto {
  id: string;
  ownerId: string;
  licensePlate: string;
  year: number;
  brand: string;
  model: string;
  color: string;
}

export interface GarageRequestDto {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
  features?: string[];
  available: boolean;
  pricePerDay?: number;
  pricePerHour?: number;
}

export interface GarageResponseDto {
  garageId: string;
  ownerId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string | null;
  features: string[] | null;
  price: number | null;
  available: boolean;
  createdAt: string;
  updatedAt: string;
  pricePerDay: number | null;
  pricePerHour: number | null;
  coverImageUrl: string | null;
  images: string[] | null;
}

export interface GarageNearbyResponseDto {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  pricePerHour: number | null;
  pricePerDay: number | null;
  available: boolean;
  distanceInKm: number;
}

export interface GarageRatingSummaryDto {
  garageId: string;
  averageRating: number | null;
  totalReviews: number | null;
}

export type BookingTypeDto = 'HOURLY' | 'DAILY';

export type BookingStatusDto = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface BookingRequestDto {
  garageId: string;
  vehicleId: string;
  bookingType: BookingTypeDto;
  startDateTime: string;
  endDateTime: string;
}

export interface BookingResponseDto {
  bookingId: string;
  driverId: string;
  garageId: string;
  vehicleId: string;
  startDateTime: string;
  endDateTime: string;
  totalAmount: number;
  bookingType: BookingTypeDto;
  status: BookingStatusDto;
  createdAt: string;
}

export type PaymentMethodDto = 'PIX' | 'CREDIT_CARD' | 'DEBIT_CARD';

export type PaymentStatusDto = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface PaymentRequestDto {
  bookingId: string;
  paymentMethod: PaymentMethodDto;
  payerEmail: string;
  payerCpf: string;
  cardToken?: string | null;
}

export interface PaymentResponseDto {
  id: string;
  bookingId: string;
  paymentMethod: PaymentMethodDto;
  status: PaymentStatusDto;
  totalAmount: number;
  platformFee: number;
  ownerNetAmount: number;
  mpPaymentId: string;
  qrCode: string;
  qrCodeBase64: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRoomResponseDto {
  roomId: string;
  bookingId: string;
  driverId: string;
  ownerId: string;
  createdAt: string;
}

export interface ChatMessageRequestDto {
  roomId: string;
  senderId: string;
  content: string;
}

export interface ChatMessageResponseDto {
  messageId: string;
  roomId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface NotificationResponseDto {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}
