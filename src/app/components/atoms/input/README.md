# Input (`app-input`)

**Camada:** atom
**Arquivos:** `input.ts`, `input.html`, `input.scss`, `input.spec.ts`, `countries.ts`, `search-mock-data.ts`

## Responsabilidade

Campo de formulário reutilizável para texto, e-mail, senha, telefone e busca. Implementa `ControlValueAccessor` e `Validator`, portanto pode ser usado com Reactive Forms e `ngModel`.

## Funcionalidades

- Ícone opcional: usuário, e-mail, telefone, senha, busca ou nenhum.
- Exibição/ocultação da senha.
- Seletor de país e máscara de telefone; o valor do formulário é compactado, com DDI e dígitos.
- Validação de formato de e-mail e mensagem de erro manual.
- Hint, estado desabilitado e botão opcional de envio.
- Sugestões mockadas de garagem quando o ícone de busca está ativo.

## API

| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `type` | `InputHtmlType` | `'text'` | `'text'`, `'email'`, `'tel'`, `'password'` ou `'search'` |
| `icon` | `InputIconType` | `'none'` | `'user'`, `'email'`, `'phone'`, `'password'`, `'search'` ou `'none'` |
| `placeholder` | `string` | `''` | Texto de placeholder |
| `hint` | `string` | `''` | Texto de ajuda |
| `errorMessage` | `string` | `''` | Erro fornecido pelo consumidor; precede o erro automático de e-mail |
| `isDisabled` | `boolean` | `false` | Desabilita o controle |
| `inputId` | `string` | `''` | ID do input nativo |
| `name` | `string` | `''` | Nome do campo |
| `autocomplete` | `string` | `''` | Valor do atributo HTML `autocomplete` |
| `enterkeyhint` | `string` | `''` | Sugestão de ação para teclado virtual |
| `isRequired` | `boolean` | `false` | Define o atributo `required` |
| `isShowSendButton` | `boolean` | `false` | Mostra a ação de envio |

| Output | Tipo | Descrição |
|---|---|---|
| `send` | `string` | Emite o valor sem espaços nas extremidades ao clicar ou pressionar Enter com o botão ativo |

## Uso

```html
<app-input
  inputId="email"
  name="email"
  type="email"
  icon="email"
  placeholder="voce@exemplo.com"
  [isRequired]="true"
  [(ngModel)]="email">
</app-input>

<app-input
  type="tel"
  icon="phone"
  [isShowSendButton]="true"
  (send)="sendMessage($event)">
</app-input>
```

O campo de telefone formata a exibição e comunica ao formulário apenas dígitos com o DDI. `countries.ts` contém a lista fixa de países. A busca usa `search-mock-data.ts` e apresenta até três sugestões; essa lista não substitui uma pesquisa do serviço.

## Testes

`input.spec.ts` cobre criação, digitação, hint/erro, senha, envio e integração com formulário. Execute com `npm test -- --watch=false`.
