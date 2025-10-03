---
keyword: IWebsocketClientPage
---

Imported from `@ngmd/websocket`

---


### Description

Interface implemented by all client services for working with ***websocket***

Currently available client services:

  - `WsSignalr`

### Interface

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

**Properties**

| Name | Type | Implementation depends on the client | Description |
|------|------|--------------------------------------|-------------|
| `connectionState` | `unknown` | **YES** | Connection state |
| `isConnected` | `unknown` | **NO** | Whether the connection is open |

### Methods

To demonstrate how the methods work, let's create the following example:

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

Method that establishes websocket connection

**Interface**

```ts
connect(url: string, params?: object): Promise<void>;
```

**Parameters**

| Name | Type | Implementation depends on the client | Description |
|------|------|--------------------------------------|-------------|
| `url` | `string` | - | Connection URL address  |
| `params` | `object` | **YES** | Connection configuration object |


**Usage**

```ts
import { HttpTransportType } from '@microsoft/signalr';

await this.ws.connect('wss:some-uri', { transport: HttpTransportType.WebSockets });
```

### disconnect

Method that closes websocket connection

**Interface**

```ts
  disconnect(cb?: () => void): Promise<void>;
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `cb` | `string` | Function that will be called after the connection is closed  |

**Usage**

```ts
await this.ws.disconnect(() => console.log('Some actions after disconnect'));
```

### on

Method that allows subscribing to incoming events from the server

**Interface**

```ts
on<const K extends InputActions['type']>(
  ...actionTypes: K[]
): Observable<Extract<InputActions, { type: K }>>;
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `actionTypes` | `...Array<NotificationDto['type']>` | List of events to listen to |

**Usage**

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

Method that allows sending events to the server

**Interface**

```ts
send(...actions: OutputActions[]): void;
```

**Parameters**

| Name | Type | Description |
|------|------|-------------|
| `actions` | `...Array<NotificationDto>` | List of events to send |

**Usage**

```ts
this.ws.send(
  new NotificationDto('hi-world', { value: ['1'] }),
  new NotificationDto('bye-world', { key: true }),
);
```




