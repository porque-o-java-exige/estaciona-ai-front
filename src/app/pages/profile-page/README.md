# Profile page (`app-profile-page`)

**Rota:** `/profile`  
**Arquivos:** `profile-page.ts`, `profile-page.html`, `profile-page.scss`, `profile-page.spec.ts`

## Responsabilidade

Apresenta perfil, carteira e gerenciamento de conta; coordena edição de dados e recarga da carteira por diálogos.

## Composição e estado

Usa `app-profile-overview` e `app-profile-tabs-content`. Lê e atualiza `AuthService`; formulários de edição e recarga são controlados pela página com `FormsModule`.

## Interações

- Editar perfil preenche os valores atuais e chama `updateProfile` ao salvar.
- Recarregar carteira inicia no valor de R$ 50 e chama `rechargeWallet` ao confirmar.
- Fechar ou cancelar o diálogo não grava alterações.

## Testes

`profile-page.spec.ts` cobre exibição, diálogos e ações do perfil. Execute com `npm test -- --watch=false`.
