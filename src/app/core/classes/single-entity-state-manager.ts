import { StateManager } from '@core/classes/state-manager';

export abstract class SingleEntityStateManager<T> extends StateManager<T> {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract updateState(value: any): void
}
