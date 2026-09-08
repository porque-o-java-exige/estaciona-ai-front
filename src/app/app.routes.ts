import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ComponentDetailPage } from './pages/component-detail/component-detail';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'component/:id', component: ComponentDetailPage },
  { path: '**', redirectTo: '' }
];
