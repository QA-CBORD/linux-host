import { StateManager } from '@core/classes/state-manager';

export abstract class SingleEntityStateManager<T> extends StateManager<T> {

  abstract updateState(value: any): void
}
