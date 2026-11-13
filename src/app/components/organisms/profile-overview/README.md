# Profile overview (`app-profile-overview`)

**Camada:** organism  
**Arquivos:** `profile-overview.ts`, `profile-overview.html`, `profile-overview.scss`, `profile-overview.spec.ts`

## Responsabilidade

Resume identidade, verificação, reputação, contagem de veículos/garagens/reservas, saldo da carteira e reserva ativa.

## Composição

Usa `app-avatar` e `RouterLink`. Eventos de editar perfil e recarregar carteira são comunicados ao consumidor.

## API

| API | Tipo | Descrição |
|---|---|---|
| Input `user` | `UserResponse` obrigatório | Identidade, saldo e métricas do usuário |
| Input `vehicleCount` | `number` obrigatório | Número de veículos |
| Input `garageCount` | `number` obrigatório | Número de garagens próprias |
| Output `editProfile` | `void` | Solicitação para editar o perfil |
| Output `rechargeWallet` | `void` | Solicitação para recarregar a carteira |

## Uso

```html
<app-profile-overview
  [user]="user"
  [vehicleCount]="vehicles.length"
  [garageCount]="garages.length"
  (editProfile)="openEditModal()"
  (rechargeWallet)="openRechargeModal()">
</app-profile-overview>
```

## Testes

`profile-overview.spec.ts` valida dados exibidos e formatação de saldo. Execute com `npm test -- --watch=false`.
