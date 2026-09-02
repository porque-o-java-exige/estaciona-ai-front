import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

/**
 * Ícones exibidos à ESQUERDA do input.
 * 'message' não entra aqui: o campo de chat usa uma AÇÃO à direita (ver `showSendButton`), não ícone à esquerda.
 */
export type InputIconType =
  | 'user'
  | 'email'
  | 'phone'
  | 'password'
  | 'search'
  | 'none';

export type InputHtmlType = 'text' | 'email' | 'tel' | 'password' | 'search';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.html',
  styleUrls: ['./input.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  /** Tipo HTML real do input (text, email, tel, password, search) */
  @Input() type: InputHtmlType = 'text';

  /** Qual ícone mostrar à esquerda. 'none' esconde o ícone. */
  @Input() icon: InputIconType = 'none';

  /** Texto exibido dentro do input quando vazio */
  @Input() placeholder = '';

  /** Texto de exemplo/ajuda exibido abaixo do input (ex: "exemplo -> ...") */
  @Input() hint = '';

  /** Mensagem de erro. Quando preenchida, o input entra em estado de erro */
  @Input() errorMessage = '';

  /** Desabilita o campo */
  @Input() disabled = false;

  /** Id do input, útil para <label for="..."> em outras páginas */
  @Input() inputId = '';

  /** Mostra um botão de "enviar" (seta) à direita do input — usado no campo de chat */
  @Input() showSendButton = false;

  /** Disparado ao clicar no botão de enviar ou apertar Enter, com o valor atual do campo */
  @Output() send = new EventEmitter<string>();

  value = '';
  showPassword = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get resolvedType(): InputHtmlType {
    if (this.type === 'password' && this.showPassword) {
      return 'text';
    }
    return this.type;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  handleInput(newValue: string): void {
    this.value = newValue;
    this.onChange(this.value);
  }

  handleBlur(): void {
    this.onTouched();
  }

  handleSend(): void {
    const trimmed = this.value.trim();
    if (!trimmed || this.disabled) {
      return;
    }
    this.send.emit(trimmed);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}