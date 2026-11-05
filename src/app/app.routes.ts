import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home';
import { ComponentDetailPage } from './pages/component-detail/component-detail';
import { ReservasComponent } from './pages/reservas/reservas'; // Ajuste o caminho/nome do arquivo se necessário

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'component/:id', component: ComponentDetailPage },
  { path: 'reservas', component: ReservasComponent }, // <-- Adicione esta linha aqui!
  { path: '**', redirectTo: '' }
];
