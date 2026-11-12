import { Country } from '../../../interfaces/country.interface';

// Lista simples com os países mais comuns pro Estaciona AI.
// Pode ir adicionando mais países aqui sem precisar mexer em nenhuma outra parte do componente.
export const COUNTRIES: Country[] = [
  { code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'US', name: 'Estados Unidos', dialCode: '+1', flag: '🇺🇸' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { code: 'UY', name: 'Uruguai', dialCode: '+598', flag: '🇺🇾' },
  { code: 'PY', name: 'Paraguai', dialCode: '+595', flag: '🇵🇾' },
  { code: 'MX', name: 'México', dialCode: '+52', flag: '🇲🇽' },
  { code: 'CO', name: 'Colômbia', dialCode: '+57', flag: '🇨🇴' },
  { code: 'ES', name: 'Espanha', dialCode: '+34', flag: '🇪🇸' },
  { code: 'GB', name: 'Reino Unido', dialCode: '+44', flag: '🇬🇧' },
  { code: 'DE', name: 'Alemanha', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'França', dialCode: '+33', flag: '🇫🇷' },
  { code: 'IT', name: 'Itália', dialCode: '+39', flag: '🇮🇹' },
  { code: 'CA', name: 'Canadá', dialCode: '+1', flag: '🇨🇦' },
  { code: 'JP', name: 'Japão', dialCode: '+81', flag: '🇯🇵' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'IN', name: 'Índia', dialCode: '+91', flag: '🇮🇳' },
  { code: 'AO', name: 'Angola', dialCode: '+244', flag: '🇦🇴' },
  { code: 'MZ', name: 'Moçambique', dialCode: '+258', flag: '🇲🇿' },
];

export const DEFAULT_COUNTRY: Country = COUNTRIES[0]; // Brasil
