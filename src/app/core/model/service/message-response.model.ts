export interface MessageResponse<T> {
  response?: T;
  exception?: any;
}
export interface ServiceParameters {
  [key: string]: any;
}
