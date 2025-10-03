import { INotification } from '../interfaces';

export class NotificationDto<ActionType extends string = string, Payload extends object = any>
  implements INotification<ActionType, Payload>
{
  constructor(
    public type: ActionType,
    public payload: Payload = null,
  ) {}
}
