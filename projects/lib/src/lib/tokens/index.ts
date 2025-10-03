import { InjectionToken } from '@angular/core';

import { INotification, IWebsocketClient } from '../interfaces';

export const WS_CLIENT: InjectionToken<IWebsocketClient<INotification, INotification>> =
  new InjectionToken('WS_CLIENT');
