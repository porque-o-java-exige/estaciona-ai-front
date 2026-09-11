# Label

O componente Label padroniza todos os estilos tipográficos do Estaciona AI em um único átomo reutilizável. Renderiza o elemento HTML semântico correto (h2, h3, p, span, label) de acordo com a variante, garantindo consistência visual em todo o app.

## Variantes
- `heading`: Renderiza um `h2` para títulos principais
- `subheading`: Renderiza um `h3` para subtítulos
- `body`: Renderiza um `p` para texto base (default)
- `caption`: Renderiza um `span` para textos de suporte
- `price`: Renderiza um `span` para preços
- `label`: Renderiza um `label` para formulários

## Propriedades
- `variant`: Variante tipográfica ('heading' | 'subheading' | 'body' | 'caption' | 'price' | 'label') - default: 'body'
- `text` (required): O texto a ser exibido
- `color`: Cor do texto para sobrescrever (opcional)

## Exemplos de Uso
- Label heading — Título de tela 'Onde vai estacionar hoje?'
- Label subheading — Subtítulo 'Vagas mais próximas de acordo com seu endereço'
- Label body — Textos corridos e descrições
- Label caption — Textos auxiliares pequenos como endereço e horário
- Label price — Preços destacados 'R$8/h'
- Label label — Rótulos de formulário
