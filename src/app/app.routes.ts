import { Routes } from '@angular/router';
import { AccountPage } from './pages/account-page/account-page';
import { BookingPage } from './pages/booking-page/booking-page';
import { ChatPage } from './pages/chat-page/chat-page';
import { ComingSoonPage } from './pages/coming-soon-page/coming-soon-page';
import { GarageDetailsPage } from './pages/garage-details-page/garage-details-page';
import { GarageListPage } from './pages/garage-list-page/garage-list-page';
import { HomePage } from './pages/home-page/home-page';
import { PaymentPage } from './pages/payment-page/payment-page';
import { ProfilePage } from './pages/profile-page/profile-page';
import { SignInPage } from './pages/sign-in-page/sign-in-page';
import { SignUpPage } from './pages/sign-up-page/sign-up-page';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInPage },
  { path: 'sign-up', component: SignUpPage },
  { path: 'home', component: HomePage },
  { path: 'list', component: GarageListPage },
  { path: 'list/details', component: GarageDetailsPage },
  { path: 'list/:id', component: GarageDetailsPage },
  { path: 'booking', component: BookingPage },
  { path: 'payment', component: PaymentPage },
  { path: 'payment/pix', component: PaymentPage },
  { path: 'chat', component: ChatPage },
  { path: 'chat/mensagens', component: ChatPage },
  { path: 'chat/:id', component: ChatPage },
  { path: 'profile/account', component: AccountPage },
  { path: 'profile/coming-soon', component: ComingSoonPage },
  { path: 'profile', component: ProfilePage },
  { path: '**', redirectTo: 'sign-in' },
];
