import { Component, computed, forwardRef, input, model, output, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputIconType = 'user' | 'email' | 'phone' | 'password' | 'search' | 'none';
export type InputHtmlType = 'text' | 'email' | 'tel' | 'password' | 'search';

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
  ],
})
export class InputComponent implements ControlValueAccessor {
  type = input<InputHtmlType>('text');
  icon = input<InputIconType>('none');
  placeholder = input<string>('');
  hint = input<string>('');
  errorMessage = input<string>('');
  disabled = model<boolean>(false);
  inputId = input<string>('');
  showSendButton = input<boolean>(false);

  send = output<string>();

  value = signal('');
  showPassword = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  resolvedType = computed(() => {
    if (this.type() === 'password' && this.showPassword()) {
      return 'text';
    }
    return this.type();
  });

  togglePasswordVisibility(): void {
    this.showPassword.update((val) => !val);
  }

  handleInput(newValue: string): void {
    this.value.set(newValue);
    this.onChange(this.value());
  }

  handleBlur(): void {
    this.onTouched();
  }

  handleSend(): void {
    const trimmed = this.value().trim();
    if (!trimmed || this.disabled()) {
      return;
    }
    this.send.emit(trimmed);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: string): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}