# Garage map (`app-garage-map`)

**Camada:** organism  
**Arquivos:** `garage-map.ts`, `garage-map.html`, `garage-map.scss`

## Responsabilidade

Exibe o mapa ilustrativo de São Paulo com pins selecionáveis, card da garagem ativa e link para abrir o catálogo. A seleção é sincronizada com `GarageService`.

## Composição

Usa o atom `app-image` para mostrar o mapa e a foto da garagem; usa `RouterLink` para navegação aos detalhes e à lista.

## Dados e comportamento

Não expõe inputs/outputs. Lê `homeGarages` e `selectedGarageId` de `GarageService`; clicar em um pin chama `selectGarage`. A consulta de detalhes usa `getGarageById`.

## Uso

```html
<app-garage-map></app-garage-map>
```

O mapa ilustrativo está em `assets/images/png/sao-paulo-map.png`. Os percentuais dos pins pertencem aos dados de garagem.
