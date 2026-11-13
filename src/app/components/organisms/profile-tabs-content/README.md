# Profile tabs content (`app-profile-tabs-content`)

**Camada:** organism  
**Arquivos:** `profile-tabs-content.ts`, `profile-tabs-content.html`, `profile-tabs-content.scss`, `profile-tabs-content.spec.ts`

## Responsabilidade

Gerencia as seções Geral, Veículos, Garagens e Configurações do perfil. Inclui formulários de inclusão de veículo/garagem, ações de conta e configurações. O cadastro de garagem permite adicionar várias fotos; a apresentação de cada garagem navega pelas imagens cadastradas em um carrossel.

## Estado e dependências

Mantém a aba ativa, os formulários locais, prévias de fotos, mensagens de validação e a posição dos carrosséis; lê e atualiza `AuthService` e navega pelo `Router` para pagamento, chat, reservas e catálogo.

## API

Não possui inputs. Output `openEditProfile: void` encaminha à página o pedido para editar dados pessoais.

## Uso

```html
<app-profile-tabs-content
  (openEditProfile)="openEditModal()">
</app-profile-tabs-content>
```

`ProfileTab` define os valores `'geral' | 'veiculos' | 'garagens' | 'config'`. Validação dos formulários e ações de cadastro são tratadas pelo componente e pelo serviço.

## Testes

`profile-tabs-content.spec.ts` cobre a criação e abas/ações. Execute com `npm test -- --watch=false`.
