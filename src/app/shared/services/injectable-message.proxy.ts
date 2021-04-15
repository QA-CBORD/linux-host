import { Injectable } from '@angular/core';
import { MutableMessage } from '@shared/model/shared-api';

@Injectable({ providedIn: 'root' })
export class MessageProxy {
  private messageHolder: MutableMessage;

  constructor() {
    this.messageHolder = MutableMessage.getInstance();
  }

  get<T>(): T {
    return this.messageHolder.get<T>();
  }

  put<T>(message: T): void {
    this.messageHolder.put(message);
  }
}
