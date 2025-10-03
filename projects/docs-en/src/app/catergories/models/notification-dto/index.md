---
keyword: NotificationDtoPage
---

Imported from `@ngmd/websocket`

---

### Description

Model used for sending and receiving data via *websocket*

### Interface

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