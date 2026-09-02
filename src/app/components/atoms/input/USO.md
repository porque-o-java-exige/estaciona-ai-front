# app-input (atom)

Componente único e reutilizável para todos os campos de input do site. Ele já sai pronto pra usar com `ngModel` OU Reactive Forms (`formControlName`), porque implementa `ControlValueAccessor`.

## Import

Como é standalone, é só importar no componente da página que for usar:

```ts
import { InputComponent } from 'src/app/components/atoms/input/input';

@Component({
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule],
  ...
})
```

## Exemplos — tela de Cadastro (Image 1)

```html
<app-input
  type="text"
  icon="user"
  placeholder="Nome"
  hint="exemplo → meu nome legal é desse jeito"
  formControlName="nome"
></app-input>

<app-input
  type="email"
  icon="email"
  placeholder="Email"
  hint="exemplo → meuexemplodeemail@gmail.com"
  formControlName="email"
></app-input>

<app-input
  type="tel"
  icon="phone"
  placeholder="Número"
  hint="exemplo → +55 (11) 11111 1111"
  formControlName="telefone"
></app-input>

<app-input
  type="password"
  icon="password"
  placeholder="Senha"
  hint="exemplo → meuexemplodesenha123@"
  formControlName="senha"
></app-input>
```

## Exemplo — busca de vaga na Home (Images 2 e 4)

```html
<app-input
  type="search"
  icon="search"
  placeholder="Buscar endereço, bairro..."
  formControlName="busca"
></app-input>
```

## Exemplo — campo de mensagem do Chat (Image 3)

Esse campo não tem ícone à esquerda: ele tem um botão de **enviar** (seta) à **direita**, que fica desabilitado enquanto o campo está vazio. Funciona tanto clicando no botão quanto apertando Enter.

```html
<app-input
  type="text"
  placeholder="digite sua mensagem..."
  formControlName="mensagem"
  [showSendButton]="true"
  (send)="enviarMensagem($event)"
></app-input>
```

```ts
enviarMensagem(texto: string): void {
  // texto já vem sem espaços em branco nas pontas
  this.chatService.enviar(texto);
  this.form.get('mensagem')?.reset();
}
```

## Exemplo — exibindo erro de validação

```html
<app-input
  type="email"
  icon="email"
  placeholder="Email"
  formControlName="email"
  [errorMessage]="form.get('email')?.invalid && form.get('email')?.touched ? 'Digite um email válido' : ''"
></app-input>
```

## Inputs disponíveis

| Input           | Tipo                                                              | Descrição                                                  |
|-----------------|--------------------------------------------------------------------|--------------------------------------------------------------|
| `type`          | `'text' \| 'email' \| 'tel' \| 'password' \| 'search'`             | Tipo HTML real do campo                                     |
| `icon`          | `'user' \| 'email' \| 'phone' \| 'password' \| 'search' \| 'none'` | Ícone exibido à esquerda                     |
| `placeholder`   | `string`                                                           | Texto exibido quando o campo está vazio                     |
| `hint`          | `string`                                                           | Texto de exemplo abaixo do campo (como nas telas de cadastro)|
| `errorMessage`  | `string`                                                           | Quando preenchido, o campo fica vermelho e mostra a mensagem |
| `disabled`      | `boolean`                                                          | Desabilita o campo                                           |
| `inputId`       | `string`                                                           | Id do `<input>`, útil se quiser usar `<label for="...">`     |
| `showSendButton`| `boolean`                                                          | Mostra o botão de enviar (seta) à direita — usado no chat    |
| `(send)`        | `EventEmitter<string>`                                             | Evento disparado ao clicar em enviar ou apertar Enter        |

O campo de senha já vem com o botão de "olhinho" (mostrar/ocultar) pronto, sem precisar configurar nada.
