import { StateManager } from '@core/classes/state-manager';

export abstract class SingleEntityStateManager<T> extends StateManager<T> {

  protected abstract setState(newState: T): void

  abstract updateState(value: any): void
}
