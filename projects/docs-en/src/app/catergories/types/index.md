---
keyword: TypesPage
---

Imported from `@ngmd/websocket`

---

### Description

Union type of available websocket clients  

### WebsocketClientFeature

Type describing the provider of client service for working with websocket

```ts
type WebsocketClientFeature = {
  provide: InjectionToken<IWebsocketClient>;
  useClass: IWebsocketClient;
};
```

Currently available clients:

  - `withSignalr`



