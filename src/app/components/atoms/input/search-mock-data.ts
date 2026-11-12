import { SearchResultItem } from '../../../interfaces/search-result-item.interface';

// Lista fictícia de estacionamentos só pra simular a busca "os 3 mais próximos".
// Em produção isso viria de uma API (ex: geolocalização + busca no back-end).
export const SEARCH_MOCK_DATA: SearchResultItem[] = [
  { id: '1', name: 'Estaciona Fácil - Paulista', address: 'Av. Paulista, 1200 - São Paulo, SP' },
  { id: '2', name: 'Park Center - Consolação', address: 'Rua da Consolação, 300 - São Paulo, SP' },
  { id: '3', name: 'Estacionamento Vila Madalena', address: 'Rua Harmonia, 88 - São Paulo, SP' },
  { id: '4', name: 'Safe Park - Pinheiros', address: 'Rua dos Pinheiros, 450 - São Paulo, SP' },
  { id: '5', name: 'Estaciona Rápido - Moema', address: 'Av. Ibirapuera, 2000 - São Paulo, SP' },
  { id: '6', name: 'Garagem Jardins', address: 'Rua Oscar Freire, 700 - São Paulo, SP' },
  { id: '7', name: 'Estacionamento Shopping Ibirapuera', address: 'Av. Ibirapuera, 3103 - São Paulo, SP' },
  { id: '8', name: 'Park & Go - Itaim Bibi', address: 'Rua Joaquim Floriano, 500 - São Paulo, SP' },
  { id: '9', name: 'Estaciona Bem - Santana', address: 'Av. Cruzeiro do Sul, 1500 - São Paulo, SP' },
  { id: '10', name: 'Vaga Certa - Tatuapé', address: 'Rua Tuiuti, 300 - São Paulo, SP' },
  { id: '11', name: 'Estacionamento Central - Sé', address: 'Praça da Sé, 100 - São Paulo, SP' },
  { id: '12', name: 'Park Zone - Vila Olímpia', address: 'Rua Funchal, 250 - São Paulo, SP' },
  { id: '13', name: 'Estaciona AI - Aeroporto', address: 'Rod. Hélio Smidt, s/n - Guarulhos, SP' },
  { id: '14', name: 'Garagem Liberdade', address: 'Rua Galvão Bueno, 40 - São Paulo, SP' },
  { id: '15', name: 'Estacionamento Higienópolis', address: 'Rua Maranhão, 88 - São Paulo, SP' },
];
