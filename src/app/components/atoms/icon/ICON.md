# Icon

O componente Icon é um wrapper padronizado para todos os ícones SVG do Design System do Estaciona AI. Mapeia um nome simbólico (ex: 'home', 'car', 'bell') para o arquivo SVG correspondente em assets/icons/, aplicando o tamanho correto automaticamente. Centraliza o catálogo completo de ícones do app.

## Variantes
O Icon não possui variantes de cores integradas, dependendo das cores base do arquivo SVG.

## Propriedades
- `name` (required): Nome do ícone (ex: 'home', 'car')
- `size`: Tamanho do ícone ('xs', 'sm', 'md', 'lg', 'xl') - default: 'md'
- `alt`: Texto alternativo para acessibilidade (opcional)

## Tamanhos
- xs: 12px
- sm: 16px
- md: 20px (default)
- lg: 24px
- xl: 32px

## Exemplos de Uso
- Icon home tamanho md — tab bar Início
- Icon booking — tab bar Reservas
- Icon payment — tab bar Pagamento
- Icon chat-tab — tab bar Chat
- Icon profile — tab bar Perfil
- Icon back-arrow — botão voltar
- Icon chevron-right — navegação em lista
- Icon car tamanho lg — card de veículo
- Icon wallet — item de perfil conta
- Icon bell — item de perfil notificações
