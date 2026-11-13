# Chat conversation list (`app-chat-conversation-list`)

**Camada:** organism  
**Arquivos:** `chat-conversation-list.ts`, `chat-conversation-list.html`, `chat-conversation-list.scss`

## Responsabilidade

Apresenta a lista de conversas com avatar, presença, última mensagem, horário e contador de não lidas. Marca visualmente a conversa atual e esconde a coluna em mobile quando uma conversa é aberta.

## Composição

Usa o atom `app-avatar` para imagem e estado de presença.

## API

| API | Tipo | Descrição |
|---|---|---|
| Input `conversations` | `readonly ChatConversation[]` obrigatório | Conversas a listar |
| Input `activeConversationId` | `string` obrigatório | ID da conversa ativa |
| Output `conversationSelected` | `string` | ID selecionado |

## Uso

```html
<app-chat-conversation-list
  [conversations]="conversations()"
  [activeConversationId]="activeConversation().id"
  (conversationSelected)="selectConversation($event)">
</app-chat-conversation-list>
```

O estado mobile é aplicado pelo host via classe `thread-open` quando usado em `ChatPage`.
