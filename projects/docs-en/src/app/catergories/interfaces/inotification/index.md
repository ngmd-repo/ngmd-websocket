---
keyword: INotificationPage
---

Imported from `@ngmd/websocket`

---


### Description

Interface used to describe incoming and outgoing event types. Serves as a ***Data Transfer Object***

### Interface

```ts
interface INotification<ActionType extends string = string, Payload extends object = any> {
  type: ActionType;
  payload: Payload;
}
```