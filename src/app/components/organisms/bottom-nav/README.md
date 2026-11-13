# Bottom navigation (`app-bottom-nav`)

**Camada:** organism  
**Arquivos:** `bottom-nav.ts`, `bottom-nav.html`, `bottom-nav.scss`, `bottom-nav.spec.ts`

## Responsabilidade

Navegação inferior para as principais áreas da aplicação, especialmente em telas móveis. Mantém destinos, ícones e destaque da rota ativa em um único lugar.

## Composição e comportamento

Utiliza `RouterLink` e `RouterLinkActive`. A lista interna de `BottomNavItem` contém Início, Reservas, Pagamento, Conversas e Perfil. O ícone sem opacidade aparece na rota ativa; o ícone opaco é usado nas demais rotas. A barra permanece fixa e centralizada na parte inferior em telas móveis.

Não possui inputs ou outputs; os links usam o roteador diretamente.

## Uso

```html
<app-bottom-nav></app-bottom-nav>
```

## Testes

`bottom-nav.spec.ts` cobre a criação. Execute com `npm test -- --watch=false`.
