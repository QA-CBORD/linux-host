
/**
 * 
 * singleton class to share data between components,
 * only suitable for short lived messages,
 * make sure is consumed quick otherwise will be overriden.
 */ 

export class MutableMessage {

  private static instance: MutableMessage;

  private message: unknown;

  public static getInstance(): MutableMessage {
    if (!MutableMessage.instance) {
      MutableMessage.instance = new MutableMessage();
    }
    return MutableMessage.instance;
  }

  put<T>(message: T): void {
    this.message = message;
  }

  get<T>(): T {
    return (this.message as T);
  }
}
