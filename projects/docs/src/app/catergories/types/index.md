---
keyword: TypesPage
---

Импортируется из `@ngmd/websocket`

---

### Описание

Union тип  доступных websocket клиентов  

### WebsocketClientFeature

Тип, описывающий провайдер клиентского сервиса по работе с websocket

```ts
type WebsocketClientFeature = {
  provide: InjectionToken<IWebsocketClient>;
  useClass: IWebsocketClient;
};
```

На данный момент доступны следующие клиенты:

  - `withSignalr`



