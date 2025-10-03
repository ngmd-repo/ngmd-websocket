---
keyword: SignalRPage
---

Импортируется из `@ngmd/websocket/signalr`

---


### Описание

**SignalR** websocket клиент. Реализован поверх библиотеки `signalr-lib`

### withSignalr

Feature функция, используемая в рамках единственного параметра функции провайдера `provideWebsocket`.  Предоставляет в качестве клиента сервис `WsSignalr`. 

Относится к типу `WebsocketClientFeature`

**Интерфейс**

```ts
function withSignalr(): WebsocketClientFeature;
```

> **Warning**
> Для работы клиента необходимо самостоятельно установить библиотеку `signalr-lib`. Версию библиотеки можно найти в поле `peerDependencies` файла *package.json* библиотеки `@ngmd/websocket`

### WsSignalr

Клиентский сервис для работы с websocket соединением через библиотеку `signalr-lib`

**Интерфейс**

```ts
import * as SignalR from '@microsoft/signalr';

export class WsSignalr<
  InputActions extends NotificationDto = any,
  OutputActions extends NotificationDto = null,
> implements IWebsocketClient<InputActions, OutputActions>
{ 
  // * Специфичные параметры

  // * params?: SignalR.IHttpConnectionOptions
  public async connect(url: string, params?: SignalR.IHttpConnectionOptions): Promise<void>;

  // * Дополнительные методы
  public off(...actionType: Array<InputActions['type']>): void;
}
```

> **NOTE**
> Описание и работу общих методов можно посмотреть на странице интерфейса `IWebsocketClient`


### Инициализация

```ts name="app.config.ts" group="methods-example"
import { ApplicationConfig } from '@angular/core';
import { provideWebsocket } from '@ngmd/websocket';
import { withSignalr } from '@ngmd/websocket/signalr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideWebsocket(withSignalr()),
  ],
};
```

```ts name="example.component.ts" group="methods-example"
import { Component } from '@angular/core';
import { useWebsocket } from '@ngmd/websocket';
import { WsSignalr } from '@ngmd/websocket/signalr';

import { TWsInputActions, TWsOutputActions } from './types.ts';
import { HubConnectionState } from '@microsoft/signalr';

@Component({/**/})
export class ExampleComponent {
  private ws: WsSignalr<TWsInputActions, TWsOutputActions> = useWebsocket();
}
```

```ts name="types.ts" group="methods-example"
import { NotificationDto } from '@ngmd/websocket';

export type TWsInputActions =
  | NotificationDto<'hi-everyone', { value: number }>
  | NotificationDto<'bye-everyone', { key: string }>;

export type TWsOutputActions =
  | NotificationDto<'hi-world', { value: string[] }>
  | NotificationDto<'bye-world', { key: boolean }>;
```

### Методы

#### off

Отменяет прослушивание событий по типам

**Интерфейс**

```ts
public off(...actionTypes: InputActions['type']): void;
```

**Использование**

```ts
this.ws.off('input', 'notification', 'types');
```
