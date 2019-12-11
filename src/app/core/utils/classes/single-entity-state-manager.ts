import { StateManager } from '@core/utils/classes/state-manager';

export abstract class SingleEntityStateManager<T> extends StateManager<T> {

  abstract setState(newState: T): void

  abstract updateState(value: any): void
}
