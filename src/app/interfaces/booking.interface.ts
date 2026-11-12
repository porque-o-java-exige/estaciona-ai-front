export type BookingStatus = 'Ativo' | 'Em andamento' | 'Concluído';

export type BookingFilter = 'Todas' | 'Em andamento' | 'Concluidas' | 'Ativas';

export type PaymentMethodType = 'pix' | 'card' | 'wallet';

export type BillingMode = 'day' | 'hour';

export interface BookingItem {
  id: string;
  garageId: string;
  garageName: string;
  address: string;
  dateTimeRange: string;
  spotCode: string;
  status: BookingStatus;
  totalAmount: number;
  distanceMeters: string;
  billingLabel: string;
  imageUrl: string;
}

