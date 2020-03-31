import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { MerchantApiService } from '@core/service/merchant-api-service/merchant-api.service';
import { Observable } from 'rxjs';
import { MerchantInfo, MerchantSearchOptions } from '@sections/ordering';
import { MerchantStateService } from '@core/states/merchant/merchant-state.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MenuMerchantFacadeService extends ServiceStateFacade {
  private readonly stateManager = new MerchantStateService;

  constructor(private readonly apiService: MerchantApiService) {
    super();
  }

  get menuMerchants$(): Observable<MerchantInfo[]> {
    return this.stateManager.state$;
  }

  get isStateUpdating$(): Observable<boolean> {
    return this.stateManager.isUpdating$;
  }

  fetchMenuMerchant$(options: MerchantSearchOptions = new MerchantSearchOptions()): Observable<MerchantInfo[]> {
    const call = this.apiService.getMenuMerchants(options);

    return this.makeRequestWithUpdatingStateHandler<MerchantInfo[]>(call, this.stateManager).pipe(
      tap((data) => this.updateMenuMerchants(data))
    );
  }

  private updateMenuMerchants(merchants: MerchantInfo[]) {
    this.stateManager.updateState(merchants);
  }
}
