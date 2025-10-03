import { Observable } from 'rxjs';

import { INotification } from './notification.interface';

export interface IWebsocketClient<
  InputActions extends INotification,
  OutputActions extends INotification,
> {
  connect(url: string, params?: object): Promise<void>;
  disconnect(cb?: () => void): Promise<void>;
  on<const K extends InputActions['type']>(
    ...actionTypes: K[]
  ): Observable<Extract<InputActions, { type: K }>>;
  send(...actions: OutputActions[]): void;
  connectionState: unknown;
  isConnected: boolean;
}
