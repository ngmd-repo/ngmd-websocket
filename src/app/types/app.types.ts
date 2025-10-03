import { NotificationDto } from '@ngmd/websocket';

export type TAppWebsocketInputActions =
  | NotificationDto<'bye-everyone', { key: string }>
  | NotificationDto<'hi-everyone', { value: number }>;

export type TAppWebsocketOutputActions =
  | NotificationDto<'bye-world', { key: boolean }>
  | NotificationDto<'hi-world', { value: string[] }>;
