import { Component, input, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Reserva } from '../../models/reserva';
import { Chip } from '../../../../components/atoms/chip/chip'; // Ajuste o caminho do seu Chip se necessário

@Component({
  selector: 'app-card-reserva',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, Chip],
  templateUrl: './card-reserva.html',
  styleUrl: './card-reserva.scss'
})
export class CardReservaComponent {
  // Recebe os dados de uma reserva
  reserva = input.required<Reserva>();

  // Mapeia o texto do status para exibição no Chip
  statusLabel = computed(() => {
    const map: Record<string, string> = {
      ATIVA: 'Ativo',
      EM_ANDAMENTO: 'Em andamento',
      CONCLUIDA: 'Concluído'
    };
    return map[this.reserva().status] || this.reserva().status;
  });

  // Define se o status é pendente/concluído para aplicar estilos no Chip
  isPendingOrDone = computed(() => {
    return this.reserva().status === 'EM_ANDAMENTO' || this.reserva().status === 'CONCLUIDA';
  });
}