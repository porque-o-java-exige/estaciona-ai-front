import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RESERVAS_MOCK } from './mocks/reservas.mock';
import { Reserva, StatusReserva } from './models/reserva';
import { CardReservaComponent } from './components/card-reserva/card-reserva';
import { Chip } from '../../components/atoms/chip/chip';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [CommonModule, CardReservaComponent],
  templateUrl: './reservas.html',
  styleUrl: './reservas.scss'
})
export class ReservasComponent {
  // Lista completa de reservas simuladas
  reservas = signal<Reserva[]>(RESERVAS_MOCK);

  // Filtro selecionado atualmente (começa em 'TODAS')
  filtroSelecionado = signal<StatusReserva>('TODAS');

  // Computed que devolve apenas as reservas filtradas com base na escolha do utilizador
  reservasFiltradas = computed(() => {
    const filtro = this.filtroSelecionado();
    const lista = this.reservas();

    if (filtro === 'TODAS') {
      return lista;
    }
    return lista.filter(reserva => reserva.status === filtro);
  });

  // Função disparada ao clicar num dos chips de filtro
  selecionarFiltro(filtro: StatusReserva) {
    this.filtroSelecionado.set(filtro);
  }
}