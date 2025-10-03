/* eslint-disable @typescript-eslint/naming-convention */
import { INotification, IWebsocketClient } from '../interfaces';
import { WS_CLIENT } from '../tokens';

export type WebsocketClientFeature = {
  provide: typeof WS_CLIENT;
  useClass: IWebsocketClient<INotification, INotification>;
};
