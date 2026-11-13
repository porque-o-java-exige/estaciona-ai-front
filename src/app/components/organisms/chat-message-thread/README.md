# Chat message thread (`app-chat-message-thread`)

**Camada:** organism  
**Arquivos:** `chat-message-thread.ts`, `chat-message-thread.html`, `chat-message-thread.scss`, `chat-message-thread.spec.ts`

## Responsabilidade

Renderiza uma conversa ativa, distingue mensagens próprias e recebidas, rola para a mensagem mais recente e fornece o formulário de envio.

## Composição

Usa `app-avatar` e `FormsModule`. A mensagem é normalizada e validada como não vazia antes da emissão.

## API

| API | Tipo | Descrição |
|---|---|---|
| Input `conversation` | `ChatConversation` obrigatório | Conversa e mensagens apresentadas |
| Output `backToList` | `void` | Ação de voltar à lista |
| Output `messageSent` | `string` | Mensagem com espaços laterais removidos |

## Uso

```html
<app-chat-message-thread
  [conversation]="activeConversation()"
  (backToList)="closeThread()"
  (messageSent)="sendMessage($event)">
</app-chat-message-thread>
```

## Testes

`chat-message-thread.spec.ts` cobre envio normalizado e rejeição de texto vazio. Execute com `npm test -- --watch=false`.
