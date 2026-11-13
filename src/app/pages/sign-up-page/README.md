# Sign up page (`app-sign-up-page`)

**Rota:** `/sign-up`  
**Arquivos:** `sign-up-page.ts`, `sign-up-page.html`, `sign-up-page.scss`, `sign-up-page.spec.ts`

## Responsabilidade

Apresenta o formulário de criação de conta com nome, e-mail, senha e telefone, mais cadastro Google.

## Composição

Usa `app-logo`, `app-input`, `app-button`, `FormsModule` e `RouterLink`. O input de telefone aplica seletor de país e máscara.

## Interações

- O formulário chama `handleSubmit`.
- A ação Google chama `handleGoogleSignUp`.
- Link de retorno de conta existente navega para `/sign-in`.

## Testes

`sign-up-page.spec.ts` cobre renderização e ações de cadastro. Execute com `npm test -- --watch=false`.
