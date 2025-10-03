import { INotification } from '@ngmd/websocket';

export class SignalrState {
  public actionTypes: string[] = [];
  public deferredActions: string[] = [];
  public deferredSendActions: INotification[] = [];
}
