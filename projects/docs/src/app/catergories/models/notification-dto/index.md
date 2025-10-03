---
keyword: NotificationDtoPage
---

Импортируется из `@ngmd/websocket`

---

### Описание

Модель, используемая для отправки и получения данных по *websocket*

### Интерфейс

```ts
class NotificationDto<
  ActionType extends string = string, 
  Payload extends object = any
> implements INotification<ActionType, Payload> {

  constructor(
    public type: ActionType,
    public payload: Payload = null,
  ) {}

}
```