import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { Observable } from 'rxjs';
import { MerchantInfo, MerchantSearchOptions } from '@sections/ordering';
import { MerchantStateService } from '@core/states/merchant/merchant-state.service';
import { tap } from 'rxjs/operators';
import { MerchantFacadeService } from '../merchant/merchant-facade.service';

@Injectable({
  providedIn: 'root',
})
export class MenuMerchantFacadeService extends ServiceStateFacade {
  private readonly stateManager = new MerchantStateService();

  constructor(private readonly merchantFacadeService: MerchantFacadeService) {
    super();
  }

  get menuMerchants$(): Observable<MerchantInfo[]> {
    return this.stateManager.state$;
  }

  get isStateUpdating$(): Observable<boolean> {
    return this.stateManager.isUpdating$;
  }

  fetchMenuMerchant$(options: MerchantSearchOptions = new MerchantSearchOptions(), noGuestFiltering?:boolean): Observable<MerchantInfo[]> {
    const call = this.merchantFacadeService.fetchMenuMerchants(options, noGuestFiltering);
    return this.makeRequestWithUpdatingStateHandler<MerchantInfo[]>(call, this.stateManager).pipe(
      tap(data => this.updateMenuMerchants(data))
    );
  }

  private updateMenuMerchants(merchants: MerchantInfo[]) {
    this.stateManager.updateState(merchants);
  }
}
