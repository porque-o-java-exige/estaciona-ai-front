# Garage details page (`app-garage-details-page`)

**Rotas:** `/list/details?id=<id>` e `/list/:id`  
**Arquivos:** `garage-details-page.ts`, `garage-details-page.html`, `garage-details-page.scss`, `garage-details-page.spec.ts`

## Responsabilidade

Resolve a garagem selecionada, apresenta seus detalhes e coordena as ações de chat e reserva.

## Composição e estado

Usa `app-garage-details`, `app-button` para voltar e `app-footer`. Resolve o identificador pelos query params ou pelo segmento da rota, consulta `GarageService` e atualiza `BookingService`.

## Interações

- Chat navega para `/chat?garageId=<id>`.
- Adicionar a reservas cria uma reserva e navega para `/booking?garageId=<id>`.
- O link de retorno leva a `/list`.

## Testes

`garage-details-page.spec.ts` cobre criação e ações da página. Execute com `npm test -- --watch=false`.
