import { Reserva } from '../models/reserva';

export const RESERVAS_MOCK: Reserva[] = [
  {
    id: '1',
    estacionamento: 'Av. paulista, 900',
    data: '08/06',
    horario: '19:00-21:00',
    status: 'ATIVA',
    vaga: 'CO3',
    nivel: 'Nível 1',
    valor: 24,
    rotuloPagamento: 'Total pago'
  },
  {
    id: '2',
    estacionamento: 'Shopping Frei Caneca P2',
    data: '08/06',
    horario: '19:00-21:00',
    status: 'EM_ANDAMENTO',
    vaga: 'CO3',
    nivel: 'Nível 1',
    valor: 24,
    rotuloPagamento: 'Total a ser pago'
  },
  {
    id: '3',
    estacionamento: 'Shopping Frei Caneca P2',
    data: '08/06',
    horario: '19:00-21:00',
    status: 'CONCLUIDA',
    vaga: 'CO3',
    nivel: 'Nível 1',
    valor: 24,
    rotuloPagamento: 'Total a ser pago'
  },
  {
    id: '4',
    estacionamento: 'Shopping Frei Caneca P2',
    data: '08/06',
    horario: '19:00-21:00',
    status: 'CONCLUIDA',
    vaga: 'CO3',
    nivel: 'Nível 1',
    valor: 24,
    rotuloPagamento: 'Total a ser pago'
  },
  {
    id: '5',
    estacionamento: 'Shopping Frei Caneca P2',
    data: '08/06',
    horario: '19:00-21:00',
    status: 'CONCLUIDA',
    vaga: 'CO3',
    nivel: 'Nível 1',
    valor: 24,
    rotuloPagamento: 'Total a ser pago'
  }
];  