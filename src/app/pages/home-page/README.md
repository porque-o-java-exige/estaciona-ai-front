# Home page (`app-home-page`)

**Rota:** `/home`  
**Arquivos:** `home-page.ts`, `home-page.html`, `home-page.scss`, `home-page.spec.ts`

## Responsabilidade

Tela inicial com saudação personalizada, mapa de vagas, garagens próximas e link para o catálogo completo.

## Composição e estado

Usa `app-garage-map`, `app-garage-card` e `app-footer`. Lê usuário de `AuthService` e garagens/seleção de `GarageService`.

## Interações

- A saudação usa o primeiro nome do usuário; se estiver vazio, usa “Motorista”.
- A seleção de um card sincroniza a garagem selecionada no serviço.
- Mapa e cards levam à lista ou aos detalhes.

## Testes

`home-page.spec.ts` cobre a renderização e dados da tela inicial. Execute com `npm test -- --watch=false`.
