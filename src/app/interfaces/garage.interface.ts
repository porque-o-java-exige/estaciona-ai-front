export type AvailabilityLevel = 'high' | 'medium' | 'low';

export interface GarageMapPin {
  top: string;
  left: string;
}

export interface GarageItem {
  id: string;
  name: string;
  address: string;
  shortSummary: string;
  description: string;
  hourlyPrice: number;
  dailyPrice: number;
  remainingSpots: number;
  availabilityLevel: AvailabilityLevel;
  rating: number;
  reviewsCount: number;
  distance: string;
  imageUrl: string;
  characteristics: string[];
  ownerName: string;
  ownerInitials: string;
  mapPin: GarageMapPin;
}

