import { computed, Injectable, signal } from '@angular/core';
import { GarageItem } from '../interfaces';

const INITIAL_GARAGES: GarageItem[] = [
  {
    id: 'garagem-paulista-prime',
    name: 'Garagem Paulista Prime',
    address: 'Av. Paulista, 1578 - Bela Vista, São Paulo',
    shortSummary: 'Coberta 24h',
    description:
      'Garagem residencial e executiva ampla, coberta e monitorada 24h com portão eletrônico rápido, iluminação em LED e acesso direto à Avenida Paulista.',
    hourlyPrice: 8,
    dailyPrice: 30,
    remainingSpots: 3,
    availabilityLevel: 'medium',
    rating: 4.8,
    reviewsCount: 124,
    distance: '0.2 km',
    imageUrl: 'assets/images/png/garage-tesla.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Câmera CFTV',
      'Carregador EV',
      'Portão automático',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Fácil manobra',
    ],
    ownerName: 'Marcus Kim',
    ownerInitials: 'MK',
    ownerAvatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    mapPin: { top: '34%', left: '44%' },
  },
  {
    id: 'estaciona-masp-center',
    name: 'Estaciona MASP Center',
    address: 'Rua Carlos Comenale, 85 - Bela Vista',
    shortSummary: 'Coberta 24h',
    description:
      'Espaço seguro a poucos metros do MASP, com controle de acesso via QR Code, vagas largas para SUVs e monitoramento contínuo.',
    hourlyPrice: 13,
    dailyPrice: 42,
    remainingSpots: 6,
    availabilityLevel: 'high',
    rating: 4.9,
    reviewsCount: 99,
    distance: '0.2 km',
    imageUrl: 'assets/images/png/garage-outdoor.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Câmera CFTV',
      'Portão automático',
      'Vaga para SUV',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Saída rápida',
    ],
    ownerName: 'Camila Rocha',
    ownerInitials: 'CR',
    ownerAvatarUrl: 'assets/images/png/chat-woman-avatar.png',
    mapPin: { top: '48%', left: '53%' },
  },
  {
    id: 'vaga-jardins-residence',
    name: 'Vaga Jardins Residence',
    address: 'Alameda Santos, 1420 - Cerqueira César',
    shortSummary: 'Coberta 24h',
    description:
      'Condomínio fechado nos Jardins com portaria 24 horas, tomada para carro elétrico e vaga privativa no primeiro subsolo.',
    hourlyPrice: 8,
    dailyPrice: 30,
    remainingSpots: 1,
    availabilityLevel: 'low',
    rating: 4.8,
    reviewsCount: 99,
    distance: '0.2 km',
    imageUrl: 'assets/images/png/garage-tesla.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Carregador EV',
      'Portaria 24h',
      'Câmera CFTV',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Subsolo privativo',
    ],
    ownerName: 'Marcus Kim',
    ownerInitials: 'MK',
    ownerAvatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    mapPin: { top: '60%', left: '36%' },
  },
  {
    id: 'park-augusta-smart',
    name: 'Park Augusta Smart',
    address: 'Rua Augusta, 1910 - Consolação',
    shortSummary: 'Coberta 24h',
    description:
      'Garagem inteligente com check-in digital imediato, cobertura integral e excelente localização próxima ao metrô Consolação.',
    hourlyPrice: 14,
    dailyPrice: 45,
    remainingSpots: 14,
    availabilityLevel: 'high',
    rating: 4.8,
    reviewsCount: 99,
    distance: '0.3 km',
    imageUrl: 'assets/images/png/garage-outdoor.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Check-in digital',
      'Câmera CFTV',
      'Portão automático',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Perto do metrô',
    ],
    ownerName: 'Rafael Mendes',
    ownerInitials: 'RM',
    ownerAvatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    mapPin: { top: '26%', left: '28%' },
  },
  {
    id: 'garagem-trianon-vip',
    name: 'Garagem Trianon VIP',
    address: 'Alameda Jaú, 1190 - Jardim Paulista',
    shortSummary: 'Coberta 24h',
    description:
      'Vaga térrea coberta em edifício residencial tranquilo ao lado do Parque Trianon, sem necessidade de deixar chaves.',
    hourlyPrice: 8,
    dailyPrice: 30,
    remainingSpots: 2,
    availabilityLevel: 'medium',
    rating: 4.8,
    reviewsCount: 99,
    distance: '0.3 km',
    imageUrl: 'assets/images/png/garage-tesla.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Sem deixar chave',
      'Câmera CFTV',
      'Portão automático',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Fácil manobra',
    ],
    ownerName: 'Beatriz Alves',
    ownerInitials: 'BA',
    ownerAvatarUrl: 'assets/images/png/chat-woman-avatar.png',
    mapPin: { top: '54%', left: '66%' },
  },
  {
    id: 'spot-frei-caneca',
    name: 'Spot Frei Caneca',
    address: 'Rua Frei Caneca, 558 - Consolação',
    shortSummary: 'Coberta 24h',
    description:
      'Acesso rápido a um quarteirão do Shopping Frei Caneca. Garagem monitorada com rampa larga e iluminação automatizada.',
    hourlyPrice: 13,
    dailyPrice: 38,
    remainingSpots: 5,
    availabilityLevel: 'high',
    rating: 4.8,
    reviewsCount: 99,
    distance: '0.4 km',
    imageUrl: 'assets/images/png/garage-outdoor.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Câmera CFTV',
      'Portão automático',
      'Rampa larga',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Acesso por tag',
    ],
    ownerName: 'Lucas Tavares',
    ownerInitials: 'LT',
    ownerAvatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    mapPin: { top: '22%', left: '60%' },
  },
  {
    id: 'garagem-itapeva-med',
    name: 'Garagem Itapeva Med',
    address: 'Rua Itapeva, 490 - Bela Vista',
    shortSummary: 'Coberta 24h',
    description:
      'Ideal para consultas médicas e compromissos na região hospitalar da Bela Vista. Vagas demarcadas e cobertas.',
    hourlyPrice: 8,
    dailyPrice: 32,
    remainingSpots: 8,
    availabilityLevel: 'medium',
    rating: 4.8,
    reviewsCount: 99,
    distance: '0.4 km',
    imageUrl: 'assets/images/png/garage-tesla.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Câmera CFTV',
      'Portão automático',
      'Acessibilidade',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Fácil manobra',
    ],
    ownerName: 'Marcus Kim',
    ownerInitials: 'MK',
    ownerAvatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    mapPin: { top: '41%', left: '72%' },
  },
  {
    id: 'vaga-haddock-lobo',
    name: 'Vaga Haddock Lobo',
    address: 'Rua Haddock Lobo, 860 - Cerqueira César',
    shortSummary: 'Coberta 24h',
    description:
      'Garagem privativa com carregador Wallbox 7kW incluso, piso epóxi e segurança reforçada no coração dos Jardins.',
    hourlyPrice: 14,
    dailyPrice: 48,
    remainingSpots: 4,
    availabilityLevel: 'low',
    rating: 4.9,
    reviewsCount: 99,
    distance: '0.5 km',
    imageUrl: 'assets/images/png/garage-outdoor.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Carregador EV',
      'Câmera CFTV',
      'Portão automático',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Piso epóxi',
    ],
    ownerName: 'Helena Costa',
    ownerInitials: 'HC',
    ownerAvatarUrl: 'assets/images/png/chat-woman-avatar.png',
    mapPin: { top: '70%', left: '24%' },
  },
  {
    id: 'estaciona-pamplona',
    name: 'Estaciona Pamplona',
    address: 'Rua Pamplona, 720 - Jardim Paulista',
    shortSummary: 'Coberta 24h',
    description:
      'Vaga individual coberta próxima à estação Trianon-Masp, com entrada independente por controle digital no app.',
    hourlyPrice: 8,
    dailyPrice: 30,
    remainingSpots: 7,
    availabilityLevel: 'low',
    rating: 4.8,
    reviewsCount: 99,
    distance: '0.5 km',
    imageUrl: 'assets/images/png/garage-tesla.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Câmera CFTV',
      'Portão automático',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Entrada direta',
      'Fácil manobra',
    ],
    ownerName: 'Marcus Kim',
    ownerInitials: 'MK',
    ownerAvatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    mapPin: { top: '65%', left: '52%' },
  },
  {
    id: 'garagem-oscar-freire',
    name: 'Garagem Oscar Freire',
    address: 'Rua Oscar Freire, 1105 - Jardins',
    shortSummary: 'Coberta 24h',
    description:
      'Estacionamento residencial premium na Rua Oscar Freire com monitoramento HD, vaga extra larga e acesso 24h.',
    hourlyPrice: 13,
    dailyPrice: 44,
    remainingSpots: 6,
    availabilityLevel: 'high',
    rating: 4.9,
    reviewsCount: 99,
    distance: '0.6 km',
    imageUrl: 'assets/images/png/garage-outdoor.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Carregador EV',
      'Câmera CFTV',
      'Portão automático',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Vaga extra larga',
    ],
    ownerName: 'Fernando Silva',
    ownerInitials: 'FS',
    ownerAvatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    mapPin: { top: '76%', left: '41%' },
  },
  {
    id: 'park-brigadeiro-sul',
    name: 'Park Brigadeiro Sul',
    address: 'Av. Brigadeiro Luís Antônio, 2340 - Bela Vista',
    shortSummary: 'Coberta 24h',
    description:
      'Garagem prática e econômica com saída direta para a Av. Brigadeiro Luís Antônio e suporte 24/7 pelo chat.',
    hourlyPrice: 8,
    dailyPrice: 28,
    remainingSpots: 14,
    availabilityLevel: 'high',
    rating: 4.7,
    reviewsCount: 99,
    distance: '0.7 km',
    imageUrl: 'assets/images/png/garage-tesla.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Câmera CFTV',
      'Portão automático',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Fácil manobra',
      'Suporte 24/7',
    ],
    ownerName: 'Marcus Kim',
    ownerInitials: 'MK',
    ownerAvatarUrl: 'assets/images/png/chat-francisco-avatar.png',
    mapPin: { top: '58%', left: '80%' },
  },
  {
    id: 'vaga-alameda-campinas',
    name: 'Vaga Alameda Campinas',
    address: 'Alameda Campinas, 640 - Jardim Paulista',
    shortSummary: 'Coberta 24h',
    description:
      'Espaço coberto silencioso e seguro a duas quadras da Av. Paulista, perfeito para diárias ou reservas por hora.',
    hourlyPrice: 14,
    dailyPrice: 40,
    remainingSpots: 2,
    availabilityLevel: 'medium',
    rating: 4.8,
    reviewsCount: 99,
    distance: '0.7 km',
    imageUrl: 'assets/images/png/garage-outdoor.png',
    characteristics: [
      'Acesso 24/7',
      'Vaga coberta',
      'Câmera CFTV',
      'Portão automático',
      'Iluminação LED',
      'Vaga demarcada',
      'Seguro incluso',
      'Sem deixar chave',
      'Fácil manobra',
    ],
    ownerName: 'Patrícia Lima',
    ownerInitials: 'PL',
    ownerAvatarUrl: 'assets/images/png/chat-woman-avatar.png',
    mapPin: { top: '38%', left: '58%' },
  },
];

@Injectable({
  providedIn: 'root',
})
export class GarageService {
  readonly garages = signal<GarageItem[]>(INITIAL_GARAGES);
  readonly searchQuery = signal<string>('');
  readonly activeFilter = signal<string>('Todas');
  readonly selectedGarageId = signal<string | null>(null);

  readonly filterOptions = [
    'Todas',
    'Menor preço',
    'Acesso 24/7',
    'Carregador EV',
    'Mais vagas',
  ] as const;

  readonly filteredGarages = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const filter = this.activeFilter();
    let list = [...this.garages()];

    if (query) {
      list = list.filter(
        (garage) =>
          garage.name.toLowerCase().includes(query) ||
          garage.address.toLowerCase().includes(query) ||
          garage.description.toLowerCase().includes(query)
      );
    }

    if (filter === 'Menor preço') {
      list.sort((a, b) => a.hourlyPrice - b.hourlyPrice);
    } else if (filter === 'Acesso 24/7') {
      list = list.filter((garage) => garage.characteristics.includes('Acesso 24/7'));
    } else if (filter === 'Carregador EV') {
      list = list.filter((garage) => garage.characteristics.includes('Carregador EV'));
    } else if (filter === 'Mais vagas') {
      list.sort((a, b) => b.remainingSpots - a.remainingSpots);
    }

    return list;
  });

  readonly homeGarages = computed(() => this.filteredGarages().slice(0, 12));

  setSearchQuery = (query: string): void => {
    this.searchQuery.set(query);
  };

  setActiveFilter = (filter: string): void => {
    this.activeFilter.set(filter);
  };

  selectGarage = (id: string): void => {
    this.selectedGarageId.set(id);
  };

  getGarageById = (id?: string | null): GarageItem => {
    const targetId = id || this.selectedGarageId();
    return (
      this.garages().find((garage) => garage.id === targetId) ?? this.garages()[0]
    );
  };
}
