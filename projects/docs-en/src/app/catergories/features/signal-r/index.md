---
keyword: SignalRPage
---

Imported from `@ngmd/websocket/signalr`

---


### Description

**SignalR** websocket client. Built on top of the `signalr-lib` library

### withSignalr

Feature function used as a single parameter for the `provideWebsocket` provider function. Provides the `WsSignalr` service as a client. 

Has type `WebsocketClientFeature`

**Interface**

```ts
function withSignalr(): WebsocketClientFeature;
```

> **Warning**
> To use the client, you need to manually install the `signalr-lib` library. The library version can be found in the `peerDependencies` field of the *package.json* file of the `@ngmd/websocket` library

### WsSignalr

Client service for working with websocket connections through the `signalr-lib` library

**Interface**

```ts
import * as SignalR from '@microsoft/signalr';

export class WsSignalr<
  InputActions extends NotificationDto = any,
  OutputActions extends NotificationDto = null,
> implements IWebsocketClient<InputActions, OutputActions>
{ 
  // * Specific parameters

  // * params?: SignalR.IHttpConnectionOptions
  public async connect(url: string, params?: SignalR.IHttpConnectionOptions): Promise<void>;

  // * Additional methods
  public off(...actionType: Array<InputActions['type']>): void;
}
```

> **NOTE**
> Description and usage of common methods can be found on the `IWebsocketClient` interface page


### Initialization

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

### Methods

#### off

Cancels listening to events by types

**Interface**

```ts
public off(...actionTypes: InputActions['type']): void;
```

**Usage**

```ts
this.ws.off('input', 'notification', 'types');
```
