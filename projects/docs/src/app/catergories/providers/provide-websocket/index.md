---
keyword: ProvideWebsocketPage
---

Импортируется из `@ngmd/websocket`

---

### provideWebsocket

Функция провайдер для работы с библиотекой

**Интерфейс**

```ts
function provideWebsocket(client: WebsocketClientFeature): Provider;
```

**Использование**

Регистрация библиотеки с клиентом `withSignalr`

```ts name="app.config.ts"
import { ApplicationConfig } from '@angular/core';
import { provideWebsocket } from '@ngmd/websocket';
import { withSignalr } from '@ngmd/websocket/signalr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideWebsocket(withSignalr()),
  ],
};
```


>**WARNING**
> В рамках провайдера может приниматься только один из возможных клиентов по работе с *websocket*. В примере выше это `signalR`

### useWebsocket

Функция инжектор для работы с websocket клиентом типа `IWebsocketClient`

**Интерфейс**

```ts
function useWebsocket<
  T extends IWebsocketClient<NotificationDto<any>, NotificationDto<any>>,
>(): T
```

**Использование**

Доступ к клиентскому сервису `WsSignalr`, зарегистрированному с помощью провайдера `withSignalr`

```ts name="example.component.ts" group="usewebsocket-group"
import { Component, OnInit } from '@angular/core';
import { useWebsocket, NotificationDto } from '@ngmd/websocket';
import { WsSignalr } from '@ngmd/websocket/signalr';

import { TWsInputActions, TWsOutputActions } from './types.ts';
import { HubConnectionState } from '@microsoft/signalr';

@Component({/**/})
export class ExampleComponent implements OnInit {
  private ws: WsSignalr<TWsInputActions, TWsOutputActions> = useWebsocket();

  ngOnInit(): void {
    this.connect();
  }

  private async connect(): Promise<void> {
    await this.ws.connect('wss:some.ws.uri');

    const state: HubConnectionState = this.ws.connectionState;

    console.log(state); //* HubConnectionState.Connected

    this.ws.send(
      new NotificationDto('hi-world', { value: ['1'] }),
      new NotificationDto('bye-world', { key: true }),
    );
  }
}
```

```ts name="types.ts" group="usewebsocket-group"
import { NotificationDto } from '@ngmd/websocket';

export type TWsInputActions =
  | NotificationDto<'hi-everyone', { value: number }>
  | NotificationDto<'bye-everyone', { key: string }>;

export type TWsOutputActions =
  | NotificationDto<'hi-world', { value: string[] }>
  | NotificationDto<'bye-world', { key: boolean }>;
```

>**WARNING**
> Каждый клиент для работы с websocket реализует базовый интерфейс `IWebsocketClient`


> **NOTE**
> При отправке и получении данных используется `NotificationDto`

