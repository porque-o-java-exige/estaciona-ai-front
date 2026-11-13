# Chat page (`app-chat-page`)

**Rotas:** `/chat`, `/chat/mensagens`, `/chat/:id`  
**Arquivos:** `chat-page.ts`, `chat-page.html`, `chat-page.scss`, `chat-page.spec.ts`

## Responsabilidade

Coordena a lista de conversas e a thread ativa, incluindo o comportamento de navegação em dispositivos móveis.

## Composição e estado

Usa `app-chat-conversation-list` e `app-chat-message-thread`. `ChatService` mantém conversas, seleção, mensagens e estado da thread mobile.

## Interações e rotas

- `/chat/:id` seleciona a conversa do parâmetro.
- `/chat/mensagens` abre a thread no layout móvel.
- `/chat` exibe a lista e o estado corrente.
- Seleção, retorno e envio são delegados ao `ChatService`.

## Testes

`chat-page.spec.ts` valida criação, conversas e envio de mensagem. A thread também possui testes próprios. Execute com `npm test -- --watch=false`.
