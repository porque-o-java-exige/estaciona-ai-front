export type StatusReserva = 'TODAS' | 'ATIVA' | 'EM_ANDAMENTO' | 'CONCLUIDA';

export interface Reserva {
  id: string;
  estacionamento: string; // Ex: "Av. paulista, 900" ou "Shopping Frei Caneca P2"
  data: string;           // Ex: "08/06"
  horario: string;        // Ex: "19:00-21:00"
  status: 'ATIVA' | 'EM_ANDAMENTO' | 'CONCLUIDA';
  vaga: string;           // Ex: "CO3"
  nivel: string;          // Ex: "Nível 1"
  valor: number;          // Ex: 24 (para formatar em R$)
  rotuloPagamento: 'Total pago' | 'Total a ser pago';
}