import { SingleEntityStateManager } from '@core/classes/single-entity-state-manager';
import { BehaviorSubject } from 'rxjs';
import { MerchantInfo } from '@sections/ordering';

export class MerchantStateService extends SingleEntityStateManager<MerchantInfo[]> {
  protected activeUpdaters = 0;
  protected state: MerchantInfo[] = [];
  protected readonly _state$: BehaviorSubject<MerchantInfo[]> = new BehaviorSubject<MerchantInfo[]>(this.state);
  protected readonly _isUpdating$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.activeUpdaters);
  private readonly merchantMap: Map<string, MerchantInfo> = new Map<string, MerchantInfo>();

  constructor() {
    super();
  }

  updateState(value: MerchantInfo[] | MerchantInfo): void {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach((merchant) => this.merchantMap.set(merchant.id, merchant));
    } else {
      this.merchantMap.set((value as MerchantInfo).id, value as MerchantInfo);
    }
    this.dispatchStateChanges();
  }

  removeMerchantById(id: string) {
    this.merchantMap.delete(id);
    this.dispatchStateChanges();
  }

  clearState(): void {
    this.merchantMap.clear();
    this.dispatchStateChanges();
  }

  protected dispatchStateChanges(): void {
    this.state = Array.from(this.merchantMap.values());
    this._state$.next(this.state);
  }
}
