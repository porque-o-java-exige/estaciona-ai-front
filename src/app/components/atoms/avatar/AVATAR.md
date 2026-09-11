# Avatar Component

## O que é
O componente Avatar exibe a identidade visual de um usuário. Quando uma URL de imagem é fornecida, exibe a foto; caso contrário, gera automaticamente as iniciais do nome.

## Estrutura da pasta
```text
avatar/
├── avatar.ts
├── avatar.html
├── avatar.scss
├── avatar.spec.ts
├── avatar.component.meta.json
└── AVATAR.md
```

## Funcionalidades
| Feature | Descrição |
|---|---|
| Imagem de Perfil | Suporta URL de imagem de perfil. |
| Iniciais | Caso não tenha imagem, renderiza as iniciais do nome. |
| Status | Indicadores de status online/offline. |
| Conta Verificada | Badge de conta verificada usando SVG específico. |
| Tamanhos | `sm`, `md`, `lg`. |

## Como usar
```html
<app-avatar
  [src]="'url-da-imagem.jpg'"
  name="Nome do Usuário"
  size="md"
  status="online"
  [isVerified]="true"
></app-avatar>
```

## Inputs disponíveis
| Input | Tipo | Padrão | Descrição |
|---|---|---|---|
| `src` | `string` | `''` | URL da imagem de perfil. |
| `name` | `string` | `''` | Nome completo para as iniciais e alt text. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho do avatar. |
| `status` | `'online' \| 'offline' \| 'none'` | `'none'` | Status atual do usuário. |
| `isVerified` | `boolean` | `false` | Se é um usuário verificado (badge azul). |
