import { inject, Provider } from '@angular/core';

import { INotification, IWebsocketClient } from '../interfaces';
import { WS_CLIENT } from '../tokens';
import { WebsocketClientFeature } from '../types';

export function provideWebsocket(client: WebsocketClientFeature): Provider {
  return client as unknown as Provider;
}

export function useWebsocket<
  T extends IWebsocketClient<INotification<any>, INotification<any>>,
>(): T {
  return inject(WS_CLIENT) as T;
}
