import {
  INotification,
  IWebsocketClient,
  WebsocketClientFeature,
  WS_CLIENT,
} from '@ngmd/websocket';

import { WsSignalr } from '../services';

export function withSignalr(): WebsocketClientFeature {
  return {
    provide: WS_CLIENT,
    useClass: WsSignalr as unknown as IWebsocketClient<INotification, INotification>,
  };
}
