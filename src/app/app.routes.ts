import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  {
    path: 'bookings',
    loadComponent: () => import('./features/bookings/bookings').then(m => m.Bookings)
  },
  {
    path: 'payment',
    loadComponent: () => import('./features/payment/payment').then(m => m.Payment)
  },
  {
    path: 'chat',
    loadComponent: () => import('./features/chat/chat').then(m => m.Chat)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile').then(m => m.Profile)
  }
];
