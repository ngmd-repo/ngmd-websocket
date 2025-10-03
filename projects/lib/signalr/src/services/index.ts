/* eslint-disable @/brace-style */
/* eslint-disable no-console */
import * as SignalR from '@microsoft/signalr';
import { INotification, IWebsocketClient } from '@ngmd/websocket';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SignalrState } from '../states/signalr.state';

export class WsSignalr<
  InputActions extends INotification = any,
  OutputActions extends INotification = null,
> implements IWebsocketClient<InputActions, OutputActions>
{
  private state: SignalrState = new SignalrState();
  private event$: Subject<InputActions> = new Subject();
  private connection$: SignalR.HubConnection;

  public get isConnected(): boolean {
    return this.connection$?.state === SignalR.HubConnectionState.Connected;
  }

  public get connectionState(): SignalR.HubConnectionState {
    return this.connection$?.state || SignalR.HubConnectionState.Disconnected;
  }

  private initDeferredActions(): void {
    this.on(
      ...(this.state.deferredActions as [InputActions['type'], ...Array<InputActions['type']>]),
    );
    this.state.deferredActions = [];
  }

  private initDeferredSendActions(): void {
    const deferredSendActions: OutputActions[] = this.state.deferredSendActions as OutputActions[];

    deferredSendActions.forEach((action: OutputActions) => this.send(action));
    this.state.deferredSendActions = [];
  }

  public async connect(url: string, params?: SignalR.IHttpConnectionOptions): Promise<void> {
    if (this.connection$) await this.disconnect();

    this.connection$ = new SignalR.HubConnectionBuilder()
      .withUrl(url, params)
      .configureLogging(SignalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    return this.connection$
      .start()
      .then(() => {
        console.log('Connected successfully');
        this.initDeferredActions();
        this.initDeferredSendActions();
      })
      .catch((e: any) => {
        console.log('Connection error: ', e);
      });
  }

  public async disconnect(onfulfilled?: () => void): Promise<void> {
    if (Boolean(this.connection$)) {
      await this.connection$
        .stop()
        .then(() => {
          this.connection$ = null;
          this.state = new SignalrState();

          if (onfulfilled) onfulfilled();

          console.log('Disconnect successfully');
        })
        .catch(e => console.error('Disconnect failed: ', e));
    } else {
      console.warn("Connection doesn't exist");
    }
  }

  private listen(type: InputActions['type']): void {
    const currentActionTypes: string[] = this.state.actionTypes;
    const isExistAction: boolean = currentActionTypes.includes(type);

    if (!isExistAction) {
      const actionTypes: string[] = currentActionTypes.concat(type);

      this.state.actionTypes = actionTypes;
      this.connection$.on(type, (payload: InputActions['payload']) => {
        this.event$.next({ type, payload } as InputActions);
      });
    }
  }

  public on<const K extends InputActions['type']>(
    ...actionTypes: [K, ...Array<K>]
  ): Observable<Extract<InputActions, { type: K }>> {
    const isConnected: boolean = Boolean(this.connection$);

    if (isConnected) {
      actionTypes.forEach((actionType: InputActions['type']) => {
        this.listen(actionType);
      });
    } else {
      const currentDeferredActions: Array<InputActions['type']> = this.state.deferredActions;
      const notExistActions: Array<InputActions['type']> = actionTypes.filter(
        a => !currentDeferredActions.includes(a),
      );
      const deferredActions: Array<InputActions['type']> =
        currentDeferredActions.concat(notExistActions);

      this.state.deferredActions = deferredActions;
    }

    return this.event$.pipe(
      filter((action: InputActions) => {
        return actionTypes.includes(action.type as any);
      }) as any,
    );
  }

  public off(...actionTypes: [InputActions['type'], ...Array<InputActions['type']>]): void {
    const currentActionTypes: string[] = this.state.actionTypes;
    const filteredActionTypes: string[] = currentActionTypes.filter(
      actionType => !actionTypes.includes(actionType),
    );

    actionTypes.forEach(actionType => this.connection$.off(actionType));
    this.state.actionTypes = filteredActionTypes;
  }

  public send(...actions: [OutputActions, ...Array<OutputActions>]): void {
    const state: SignalR.HubConnectionState = this.connection$?.state;

    switch (state) {
      case SignalR.HubConnectionState.Connected: {
        actions.forEach((a: OutputActions) => {
          this.connection$.send(a.type, a.payload);
        });

        break;
      }
      default: {
        const deferredSendActions: OutputActions[] = this.state
          .deferredSendActions as OutputActions[];
        const updatedSendActions: OutputActions[] = deferredSendActions.concat(actions);

        this.state.deferredSendActions = updatedSendActions;
      }
    }
  }
}
