export interface INotification<ActionType extends string = string, Payload extends object = any> {
  type: ActionType;
  payload: Payload;
}
