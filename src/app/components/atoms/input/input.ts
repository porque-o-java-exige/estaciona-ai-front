import {
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

import { Country } from '../../../interfaces/country.interface';
import { SearchResultItem } from '../../../interfaces/search-result-item.interface';
import { COUNTRIES, DEFAULT_COUNTRY } from './countries';
import { SEARCH_MOCK_DATA } from './search-mock-data';

export type InputIconType = 'user' | 'email' | 'phone' | 'password' | 'search' | 'none';
export type InputHtmlType = 'text' | 'email' | 'tel' | 'password' | 'search';

// Formato: algo@provedor.algumaCoisa — o provedor e o "." são obrigatórios,
// mas precisa ter algo depois do último ponto também (não pode terminar em ".",
// nem começar o provedor com "." nem ter ".." seguidos).
// Aceita quantos pontos o provedor tiver (ex: prefeitura.sme.br).
// A extensão/domínio final não importa aqui porque quem trata isso é o back-end,
// que manda o e-mail de verificação.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

// Monta a máscara (DDD) NNNNN-NNNN a partir dos dígitos digitados,
// funcionando tanto pra celular (9 dígitos) quanto pra fixo (8 dígitos)
function formatLocalPhone(digits: string): string {
  if (!digits) {
    return '';
  }
  if (digits.length <= 2) {
    return `(${digits}`;
  }
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  if (rest.length <= 4) {
    return `(${ddd}) ${rest}`;
  }
  const front = rest.slice(0, rest.length - 4);
  const back = rest.slice(-4);
  return `(${ddd}) ${front}-${back}`;
}

@Component({
  selector: 'app-input',
  imports: [FormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, Validator {
  type = input<InputHtmlType>('text');
  icon = input<InputIconType>('none');
  placeholder = input<string>('');
  hint = input<string>('');
  errorMessage = input<string>('');
  isDisabled = model<boolean>(false);
  inputId = input<string>('');
  isShowSendButton = input<boolean>(false);

  send = output<string>();

  value = signal('');
  isShowPassword = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Referência direta ao <input> nativo. Usada pra forçar o valor exibido
  // depois da máscara — o binding [value] sozinho às vezes não reescreve o DOM
  // quando o Angular acha que "o valor não mudou", deixando caracteres inválidos
  // (letras, símbolos) grudados na tela mesmo depois de removidos da lógica.
  private controlInputRef = viewChild<ElementRef<HTMLInputElement>>('controlInput');

  // ---- Telefone (país + máscara) ----
  countries: Country[] = COUNTRIES;
  selectedCountry = signal<Country>(DEFAULT_COUNTRY);
  // equal: () => false garante que o Angular sempre re-renderize o valor "limpo"
  // no input, mesmo quando os dígitos não mudam (ex: usuário digitando letra/símbolo
  // depois de já ter atingido o limite de 11 dígitos) — sem isso, esses caracteres
  // inválidos ficavam "grudados" na tela sem serem removidos.
  private phoneDigits = signal('', { equal: () => false }); // só DDD + número, sem código do país, só dígitos

  phoneDisplay = computed(() => formatLocalPhone(this.phoneDigits()));

  // Valor "compactado" que vai pro back-end: +55 (11) 91335-9082 -> 5511913359082
  phoneCompactValue = computed(() => {
    const dial = this.selectedCountry().dialCode.replace('+', '');
    return `${dial}${this.phoneDigits()}`;
  });

  // ---- E-mail (validação @gmail.com / @outlook.com) ----
  emailError = computed(() => {
    if (this.type() !== 'email') {
      return '';
    }
    const v = this.value().trim();
    if (!v) {
      return '';
    }
    return EMAIL_PATTERN.test(v) ? '' : 'Digite um e-mail válido';
  });

  // Erro que efetivamente aparece: prioriza o que o pai mandou (ex: "campo obrigatório"),
  // senão cai pra validação automática de e-mail
  displayError = computed(() => this.errorMessage() || this.emailError());

  // ---- Busca (3 resultados mais próximos, mockados) ----
  isSearchFocused = signal(false);

  searchResults = computed<SearchResultItem[]>(() => {
    if (this.icon() !== 'search') {
      return [];
    }
    const query = this.value().trim().toLowerCase();
    if (!query) {
      return [];
    }
    return SEARCH_MOCK_DATA.filter((item) => item.name.toLowerCase().includes(query))
      .sort((a, b) => a.name.toLowerCase().indexOf(query) - b.name.toLowerCase().indexOf(query))
      .slice(0, 3);
  });

  // ---- Valor exibido no <input>, varia conforme o tipo ----
  controlDisplayValue = computed(() => {
    if (this.type() === 'tel') {
      return this.phoneDisplay();
    }
    return this.value();
  });

  resolvedType = computed(() => {
    if (this.type() === 'password' && this.isShowPassword()) {
      return 'text';
    }
    return this.type();
  });

  togglePasswordVisibility(): void {
    this.isShowPassword.update((val) => !val);
  }

  handleInput(newValue: string): void {
    if (this.type() === 'tel') {
      this.handlePhoneInput(newValue);
      return;
    }
    this.value.set(newValue);
    this.onChange(this.value());
  }

  private handlePhoneInput(raw: string): void {
    const digits = raw.replace(/\D/g, '').slice(0, 11); // DDD (2) + até 9 dígitos do número
    this.phoneDigits.set(digits);
    this.syncNativeInputValue();
    this.onChange(this.phoneCompactValue());
  }

  // Reescreve o valor do <input> na marra, garantindo que qualquer caractere
  // inválido digitado (letra, símbolo etc.) some imediatamente, mesmo que o
  // resultado sanitizado seja igual ao que já estava lá antes.
  private syncNativeInputValue(): void {
    const el = this.controlInputRef()?.nativeElement;
    if (el) {
      el.value = this.controlDisplayValue();
    }
  }

  handleCountryChange(countryCode: string): void {
    const country = this.countries.find((c) => c.code === countryCode);
    if (!country) {
      return;
    }
    this.selectedCountry.set(country);
    this.onChange(this.phoneCompactValue());
  }

  handleFocus(): void {
    this.isSearchFocused.set(true);
  }

  handleBlur(): void {
    this.isSearchFocused.set(false);
    this.onTouched();
  }

  handleSelectResult(item: SearchResultItem): void {
    this.value.set(item.name);
    this.onChange(item.name);
    this.isSearchFocused.set(false);
  }

  handleSend(): void {
    const trimmed = this.value().trim();
    if (!trimmed || this.isDisabled()) {
      return;
    }
    this.send.emit(trimmed);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: string): void {
    if (this.type() === 'tel') {
      this.writePhoneValue(value ?? '');
      return;
    }
    this.value.set(value ?? '');
  }

  // Recebe o valor "compactado" (ex: 5511913359082), acha o país pelo DDI
  // e separa de volta em país + dígitos locais pra exibir formatado
  private writePhoneValue(raw: string): void {
    const digitsOnly = raw.replace(/\D/g, '');
    if (!digitsOnly) {
      this.phoneDigits.set('');
      this.syncNativeInputValue();
      return;
    }
    const sortedByDialLength = [...this.countries].sort(
      (a, b) => b.dialCode.length - a.dialCode.length,
    );
    const found = sortedByDialLength.find((c) =>
      digitsOnly.startsWith(c.dialCode.replace('+', '')),
    );
    if (found) {
      this.selectedCountry.set(found);
      this.phoneDigits.set(digitsOnly.slice(found.dialCode.replace('+', '').length).slice(0, 11));
    } else {
      this.phoneDigits.set(digitsOnly.slice(0, 11));
    }
    this.syncNativeInputValue();
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  // ---- Validator (integra a validação de e-mail com o Reactive Forms) ----
  validate(control: AbstractControl): ValidationErrors | null {
    if (this.type() !== 'email') {
      return null;
    }
    const v = (control.value ?? '').toString().trim();
    if (!v) {
      return null;
    }
    return EMAIL_PATTERN.test(v) ? null : { invalidEmail: true };
  }
}
