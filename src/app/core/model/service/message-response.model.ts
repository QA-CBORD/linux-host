export interface MessageResponse<T> {
  response?: T;
  exception?: string;
}
export interface ServiceParameters {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface MessageListResponse<T> {
  list: T[];
  empty: boolean;
}
