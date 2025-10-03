---
keyword: INotificationPage
---

Импортируется из `@ngmd/websocket`

---


### Описание

Интерфейс, использующийся для описания входящих и исходящих типов событий. Выполняет роль ***Data Transfer Object***

### Интерфейс

```ts
interface INotification<ActionType extends string = string, Payload extends object = any> {
  type: ActionType;
  payload: Payload;
}
```