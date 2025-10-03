---
keyword: IWebsocketClientPage
---

Импортируется из `@ngmd/websocket`

---


### Описание

Интерфейс, который реализуется всеми клиентскими сервисами для работы с ***websocket***

На данный момент доступны следующие сервисы:

  - `WsSignalr`



### Интерфейс

```ts
import { Observable } from 'rxjs';
import { INotification } from '@ngmd/websocket';

interface IWebsocketClient<
  InputActions extends INotification,
  OutputActions extends INotification,
> {
  connect(url: string, params?: object): Promise<void>;
  disconnect(cb?: () => void): Promise<void>;
  on<const K extends InputActions['type']>(...actionTypes: K[]): Observable<Extract<InputActions, { type: K }>>
  send(...actions: OutputActions[]): void;
  connectionState: unknown;
  isConnected: boolean;
}
```

**Свойства**

| Name | Type | Implementation depends on the client | Description |
|------|------|--------------------------------------|-------------|
| `connectionState` | `unknown` | **YES** | Состояние соединения |
| `isConnected` | `unknown` | **NO** | Открыто ли соединение |

### Методы

Для демонстрации работы методов создадим следующий пример:

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

### connect

Метод, устанавливающий websocket соединение

**Интерфейс**

```ts
connect(url: string, params?: object): Promise<void>;
```

**Параметры**

| Name | Type | Implementation depends on the client | Description |
|------|------|--------------------------------------|-------------|
| `url` | `string` | - | URL адрес соединения  |
| `params` | `object` | **YES** | Объект конфигурации соединения |


**Использование**

```ts
import { HttpTransportType } from '@microsoft/signalr';

await this.ws.connect('wss:some-uri', { transport: HttpTransportType.WebSockets });
```

### disconnect

Метод, закрывающий websocket соединение

**Интерфейс**

```ts
  disconnect(cb?: () => void): Promise<void>;
```

**Параметры**

| Name | Type | Description |
|------|------|-------------|
| `cb` | `string` | Функция, которая будет вызвана после того, как соединение будет закрыто  |

**Использование**

```ts
await this.ws.disconnect(() => console.log('Some actions after disconnect'));
```

### on

Метод, позволяющий подписаться на входящие с сервера события

**Интерфейс**

```ts
on<const K extends InputActions['type']>(
  ...actionTypes: K[]
): Observable<Extract<InputActions, { type: K }>>;
```

**Параметры**

| Name | Type | Description |
|------|------|-------------|
| `actionTypes` | `...Array<NotificationDto['type']>` | Список прослушиваемых событий |

**Использование**

```ts
this.ws.on('hi-everyone', 'bye-everyone').subscribe(({ type, payload }) => {
  switch (type) {
    case 'hi-everyone': {
      // * Some actions
      break;
    }
    case 'bye-everyone': {
      // * Some actions
      break;
    }
  }
});
```


### send

Метод, позволяющий отправить события на сервер

**Интерфейс**

```ts
send(...actions: OutputActions[]): void;
```

**Параметры**

| Name | Type | Description |
|------|------|-------------|
| `actions` | `...Array<NotificationDto>` | Список событий на отправку |

**Использование**

```ts
this.ws.send(
  new NotificationDto('hi-world', { value: ['1'] }),
  new NotificationDto('bye-world', { key: true }),
);
```




