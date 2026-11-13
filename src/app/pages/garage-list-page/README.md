# Garage list page (`app-garage-list-page`)

**Rota:** `/list`  
**Arquivos:** `garage-list-page.ts`, `garage-list-page.html`, `garage-list-page.scss`, `garage-list-page.spec.ts`

## Responsabilidade

Apresenta o catálogo filtrado de garagens, contagem de resultados, filtros e estado vazio com opção de limpar filtros.

## Composição e estado

Usa `app-filter-tabs`, `app-garage-card`, `app-button` e `app-footer`. Dados e estado de busca/seleção vêm de `GarageService`.

## Interações

- Alterar uma opção chama `setActiveFilter`.
- Selecionar um card chama `selectGarage` e permite abrir os detalhes.
- Limpar filtros remove a busca e retorna a opção `Todas`.

## Testes

`garage-list-page.spec.ts` cobre catálogo, filtros e estado vazio. Execute com `npm test -- --watch=false`.
