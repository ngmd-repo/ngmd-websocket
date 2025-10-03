---
keyword: ProvideWebsocketPage
---

Imported from `@ngmd/websocket`

---

### provideWebsocket

Provider function for working with the library

**Interface**

```ts
function provideWebsocket(client: WebsocketClientFeature): Provider;
```

**Usage**

Library registration with `withSignalr` client

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
> The provider can only accept one possible client for working with *websocket*. In the example above it's `signalR`

### useWebsocket

Injector function for working with websocket client of type `IWebsocketClient`

**Interface**

```ts
function useWebsocket<
  T extends IWebsocketClient<NotificationDto<any>, NotificationDto<any>>,
>(): T
```

**Usage**

Access to the `WsSignalr` client service registered with the `withSignalr` provider

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
> Each client for working with websocket implements the base interface `IWebsocketClient`


> **NOTE**
> When sending and receiving data, `NotificationDto` is used

