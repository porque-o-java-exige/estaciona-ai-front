import { Country } from '../../../interfaces/country.interface';

const getUserCountryCode = (): string => {
  const timezoneCountryMap: Record<string, string> = {
    'America/Sao_Paulo': 'BR',
    'America/Rio': 'BR',
    'America/Belo_Horizonte': 'BR',
    'America/Curitiba': 'BR',
    'America/Porto_Velho': 'BR',
    'America/Belem': 'BR',
    'America/Fortaleza': 'BR',
    'America/Manaus': 'BR',
    'America/Natal': 'BR',
    'America/Campo_Grande': 'BR',
    'America/Araguaina': 'BR',
    'America/Santarem': 'BR',
    'America/Recife': 'BR',
    'America/Salvador': 'BR',
    'America/Boa_Vista': 'BR',
    'America/Maceio': 'BR',
    'America/Aracaju': 'BR',
    'America/Goiania': 'BR',
    'America/Cuiaba': 'BR',
    'America/Bahia': 'BR',
    'America/Sao_Paulo': 'BR',
    'America/Argentina/Buenos_Aires': 'AR',
    'America/Argentina/Cordoba': 'AR',
    'America/Mexico_City': 'MX',
    'America/Los_Angeles': 'US',
    'America/New_York': 'US',
    'Europe/Lisbon': 'PT',
    'Europe/Madrid': 'ES',
    'Europe/Paris': 'FR',
    'Europe/Berlin': 'DE',
    'Europe/Rome': 'IT',
    'Asia/Sao_Paulo': 'BR',
  };

  if (typeof Intl !== 'undefined') {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone && timezoneCountryMap[timezone]) {
      return timezoneCountryMap[timezone];
    }
  }

  if (typeof navigator !== 'undefined') {
    const language = navigator.language || 'pt-BR';
    const regionFromLocale = language.split('-')[1]?.toUpperCase();
    if (regionFromLocale && COUNTRIES.some((country) => country.code === regionFromLocale)) {
      return regionFromLocale;
    }
  }

  return 'BR';
};

// Lista simples com os países mais comuns pro Estaciona AI.
// Pode ir adicionando mais países aqui sem precisar mexer em nenhuma outra parte do componente.
export const COUNTRIES: Country[] = [
  { code: 'AF', name: 'Afeganistão', dialCode: '+93', flag: '🇦🇫' },
  { code: 'AL', name: 'Albânia', dialCode: '+355', flag: '🇦🇱' },
  { code: 'DZ', name: 'Argélia', dialCode: '+213', flag: '🇩🇿' },
  { code: 'AD', name: 'Andorra', dialCode: '+376', flag: '🇦🇩' },
  { code: 'AO', name: 'Angola', dialCode: '+244', flag: '🇦🇴' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'AM', name: 'Armênia', dialCode: '+374', flag: '🇦🇲' },
  { code: 'AU', name: 'Austrália', dialCode: '+61', flag: '🇦🇺' },
  { code: 'AT', name: 'Áustria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'AZ', name: 'Azerbaijão', dialCode: '+994', flag: '🇦🇿' },
  { code: 'BH', name: 'Bahrein', dialCode: '+973', flag: '🇧🇭' },
  { code: 'BE', name: 'Bélgica', dialCode: '+32', flag: '🇧🇪' },
  { code: 'BO', name: 'Bolívia', dialCode: '+591', flag: '🇧🇴' },
  { code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'BG', name: 'Bulgária', dialCode: '+359', flag: '🇧🇬' },
  { code: 'CA', name: 'Canadá', dialCode: '+1', flag: '🇨🇦' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'CO', name: 'Colômbia', dialCode: '+57', flag: '🇨🇴' },
  { code: 'HR', name: 'Croácia', dialCode: '+385', flag: '🇭🇷' },
  { code: 'CU', name: 'Cuba', dialCode: '+53', flag: '🇨🇺' },
  { code: 'DK', name: 'Dinamarca', dialCode: '+45', flag: '🇩🇰' },
  { code: 'EC', name: 'Equador', dialCode: '+593', flag: '🇪🇨' },
  { code: 'SV', name: 'El Salvador', dialCode: '+503', flag: '🇸🇻' },
  { code: 'AE', name: 'Emirados Árabes', dialCode: '+971', flag: '🇦🇪' },
  { code: 'SK', name: 'Eslováquia', dialCode: '+421', flag: '🇸🇰' },
  { code: 'SI', name: 'Eslovênia', dialCode: '+386', flag: '🇸🇮' },
  { code: 'ES', name: 'Espanha', dialCode: '+34', flag: '🇪🇸' },
  { code: 'US', name: 'Estados Unidos', dialCode: '+1', flag: '🇺🇸' },
  { code: 'EE', name: 'Estônia', dialCode: '+372', flag: '🇪🇪' },
  { code: 'FI', name: 'Finlândia', dialCode: '+358', flag: '🇫🇮' },
  { code: 'FR', name: 'França', dialCode: '+33', flag: '🇫🇷' },
  { code: 'GE', name: 'Geórgia', dialCode: '+995', flag: '🇬🇪' },
  { code: 'DE', name: 'Alemanha', dialCode: '+49', flag: '🇩🇪' },
  { code: 'GR', name: 'Grécia', dialCode: '+30', flag: '🇬🇷' },
  { code: 'GT', name: 'Guatemala', dialCode: '+502', flag: '🇬🇹' },
  { code: 'HN', name: 'Honduras', dialCode: '+504', flag: '🇭🇳' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
  { code: 'HU', name: 'Hungria', dialCode: '+36', flag: '🇭🇺' },
  { code: 'IN', name: 'Índia', dialCode: '+91', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonésia', dialCode: '+62', flag: '🇮🇩' },
  { code: 'IE', name: 'Irlanda', dialCode: '+353', flag: '🇮🇪' },
  { code: 'IS', name: 'Islândia', dialCode: '+354', flag: '🇮🇸' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
  { code: 'IT', name: 'Itália', dialCode: '+39', flag: '🇮🇹' },
  { code: 'JP', name: 'Japão', dialCode: '+81', flag: '🇯🇵' },
  { code: 'KZ', name: 'Cazaquistão', dialCode: '+7', flag: '🇰🇿' },
  { code: 'KE', name: 'Quênia', dialCode: '+254', flag: '🇰🇪' },
  { code: 'KR', name: 'Coreia do Sul', dialCode: '+82', flag: '🇰🇷' },
  { code: 'KW', name: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
  { code: 'LV', name: 'Letônia', dialCode: '+371', flag: '🇱🇻' },
  { code: 'LB', name: 'Líbano', dialCode: '+961', flag: '🇱🇧' },
  { code: 'LT', name: 'Lituânia', dialCode: '+370', flag: '🇱🇹' },
  { code: 'LU', name: 'Luxemburgo', dialCode: '+352', flag: '🇱🇺' },
  { code: 'MY', name: 'Malásia', dialCode: '+60', flag: '🇲🇾' },
  { code: 'MX', name: 'México', dialCode: '+52', flag: '🇲🇽' },
  { code: 'MZ', name: 'Moçambique', dialCode: '+258', flag: '🇲🇿' },
  { code: 'NL', name: 'Países Baixos', dialCode: '+31', flag: '🇳🇱' },
  { code: 'NG', name: 'Nigéria', dialCode: '+234', flag: '🇳🇬' },
  { code: 'NO', name: 'Noruega', dialCode: '+47', flag: '🇳🇴' },
  { code: 'NZ', name: 'Nova Zelândia', dialCode: '+64', flag: '🇳🇿' },
  { code: 'PA', name: 'Panamá', dialCode: '+507', flag: '🇵🇦' },
  { code: 'PY', name: 'Paraguai', dialCode: '+595', flag: '🇵🇾' },
  { code: 'PE', name: 'Peru', dialCode: '+51', flag: '🇵🇪' },
  { code: 'PH', name: 'Filipinas', dialCode: '+63', flag: '🇵🇭' },
  { code: 'PL', name: 'Polônia', dialCode: '+48', flag: '🇵🇱' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'QA', name: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { code: 'RO', name: 'Romênia', dialCode: '+40', flag: '🇷🇴' },
  { code: 'RU', name: 'Rússia', dialCode: '+7', flag: '🇷🇺' },
  { code: 'SA', name: 'Arábia Saudita', dialCode: '+966', flag: '🇸🇦' },
  { code: 'RS', name: 'Sérvia', dialCode: '+381', flag: '🇷🇸' },
  { code: 'SG', name: 'Singapura', dialCode: '+65', flag: '🇸🇬' },
  { code: 'ZA', name: 'África do Sul', dialCode: '+27', flag: '🇿🇦' },
  { code: 'SE', name: 'Suécia', dialCode: '+46', flag: '🇸🇪' },
  { code: 'CH', name: 'Suíça', dialCode: '+41', flag: '🇨🇭' },
  { code: 'TH', name: 'Tailândia', dialCode: '+66', flag: '🇹🇭' },
  { code: 'TR', name: 'Turquia', dialCode: '+90', flag: '🇹🇷' },
  { code: 'UA', name: 'Ucrânia', dialCode: '+380', flag: '🇺🇦' },
  { code: 'UY', name: 'Uruguai', dialCode: '+598', flag: '🇺🇾' },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪' },
  { code: 'VN', name: 'Vietnã', dialCode: '+84', flag: '🇻🇳' },
  { code: 'GB', name: 'Reino Unido', dialCode: '+44', flag: '🇬🇧' },
];

export const DEFAULT_COUNTRY: Country =
  COUNTRIES.find((country) => country.code === getUserCountryCode()) ??
  COUNTRIES.find((country) => country.code === 'BR') ??
  COUNTRIES[0];