# Sign in page (`app-sign-in-page`)

**Rota:** `/sign-in` (também destino da rota raiz e do fallback)  
**Arquivos:** `sign-in-page.ts`, `sign-in-page.html`, `sign-in-page.scss`, `sign-in-page.spec.ts`

## Responsabilidade

Reúne autenticação por e-mail e senha, alternativa Google e navegação para cadastro.

## Composição

Usa `app-logo`, `app-input`, `app-button`, `FormsModule` e `RouterLink`.

## Interações

- O formulário chama `handleSubmit`.
- A ação Google chama `handleGoogleSignIn`.
- O campo de senha e e-mail usa os estados de validação fornecidos pela tela.
- Link de cadastro navega para `/sign-up`.

## Testes

`sign-in-page.spec.ts` cobre renderização e ações de autenticação. Execute com `npm test -- --watch=false`.
