# Sidebar (`app-sidebar`)

**Camada:** organism  
**Arquivos:** `sidebar.ts`, `sidebar.html`, `sidebar.scss`, `sidebar.spec.ts`

## Responsabilidade

Navegação lateral expansível para Home, Reservas, Pagamento, Conversas e Perfil. Recolhe quando o foco sai do menu e destaca a rota ativa.

## Composição e API

Usa `RouterLink` e `RouterLinkActive`. Não recebe inputs nem emite outputs. O ícone sem opacidade aparece na rota ativa; o ícone opaco é usado nas demais rotas.

## Uso

```html
<app-sidebar></app-sidebar>
```

O menu permanece fixo à esquerda e ocupa toda a altura da tela desktop. Os nomes aparecem somente enquanto o ponteiro está sobre o menu. Seus ícones PNG ficam em `assets/icons/png/`.

## Testes

`sidebar.spec.ts` cobre a criação. Execute com `npm test -- --watch=false`.
