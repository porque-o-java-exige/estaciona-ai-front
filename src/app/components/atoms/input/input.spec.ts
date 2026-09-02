import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { InputComponent } from './input';

// Componente hospedeiro usado só pra testar o binding com Reactive Forms de verdade
@Component({
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  template: `<app-input [formControl]="control" [type]="'text'"></app-input>`,
})
class HostComponent {
  control = new FormControl('');
}

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar o placeholder recebido', () => {
    component.placeholder = 'Nome';
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.placeholder).toBe('Nome');
  });

  it('deve atualizar o valor ao digitar (evento input)', () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    input.value = 'Rodrigo';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.value).toBe('Rodrigo');
  });

  it('não deve mostrar o texto de exemplo (hint) quando houver errorMessage', () => {
    component.hint = 'exemplo -> algo';
    component.errorMessage = 'Campo obrigatório';
    fixture.detectChanges();

    const hint = fixture.debugElement.query(By.css('.app-input__hint'));
    const error = fixture.debugElement.query(By.css('.app-input__error'));

    expect(hint).toBeNull();
    expect(error.nativeElement.textContent).toContain('Campo obrigatório');
  });

  describe('campo de senha', () => {
    beforeEach(() => {
      component.type = 'password';
      fixture.detectChanges();
    });

    it('deve começar como type="password"', () => {
      expect(component.resolvedType).toBe('password');
    });

    it('deve alternar para texto visível ao clicar no botão de olhinho', () => {
      const toggleBtn = fixture.debugElement.query(By.css('.app-input__toggle')).nativeElement as HTMLButtonElement;

      toggleBtn.click();
      fixture.detectChanges();

      expect(component.showPassword).toBeTrue();
      expect(component.resolvedType).toBe('text');
    });
  });

  describe('botão de enviar (chat)', () => {
    beforeEach(() => {
      component.showSendButton = true;
      fixture.detectChanges();
    });

    it('deve ficar desabilitado quando o campo está vazio', () => {
      const sendBtn = fixture.debugElement.query(By.css('.app-input__send')).nativeElement as HTMLButtonElement;
      expect(sendBtn.disabled).toBeTrue();
    });

    it('deve emitir "send" com o texto sem espaços nas pontas ao clicar', () => {
      let emitted = '';
      component.send.subscribe((value: string) => (emitted = value));

      component.writeValue('  Olá, tudo bem?  ');
      fixture.detectChanges();

      const sendBtn = fixture.debugElement.query(By.css('.app-input__send')).nativeElement as HTMLButtonElement;
      sendBtn.click();

      expect(emitted).toBe('Olá, tudo bem?');
    });

    it('não deve emitir "send" se o campo estiver vazio', () => {
      const spy = jasmine.createSpy('send');
      component.send.subscribe(spy);

      component.handleSend();

      expect(spy).not.toHaveBeenCalled();
    });
  });
});

describe('InputComponent com Reactive Forms', () => {
  let hostFixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostComponent);
    host = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('deve refletir o valor inicial do FormControl no input', () => {
    host.control.setValue('Estaciona AI');
    hostFixture.detectChanges();

    const input = hostFixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.value).toBe('Estaciona AI');
  });

  it('deve atualizar o FormControl quando o usuário digita', () => {
    const input = hostFixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    input.value = 'novo valor';
    input.dispatchEvent(new Event('input'));
    hostFixture.detectChanges();

    expect(host.control.value).toBe('novo valor');
  });

  it('deve desabilitar o input quando o FormControl é desabilitado', () => {
    host.control.disable();
    hostFixture.detectChanges();

    const input = hostFixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.disabled).toBeTrue();
  });
});