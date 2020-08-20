import { Injectable } from '@angular/core';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { MerchantApiService } from '@core/service/merchant-api-service/merchant-api.service';
import { Observable } from 'rxjs';
import { MerchantInfo, MerchantSearchOptions } from '@sections/ordering';
import { tap } from 'rxjs/operators';
import { MerchantStateService } from '@core/states/merchant/merchant-state.service';

@Injectable({
  providedIn: 'root',
})
export class MerchantFacadeService extends ServiceStateFacade {

  private readonly stateManager: MerchantStateService = new MerchantStateService();

  constructor(private readonly apiService: MerchantApiService) {
    super();
  }

  get merchants$(): Observable<MerchantInfo[]> {
    return this.stateManager.state$;
  }

  get isStateUpdating$(): Observable<boolean> {
    return this.stateManager.isUpdating$;
  }

  fetchMerchants$(options: MerchantSearchOptions = new MerchantSearchOptions()) {
    const call = this.apiService.getMerchants(options);

    return this.makeRequestWithUpdatingStateHandler<MerchantInfo[]>(call, this.stateManager).pipe(
      tap((data: MerchantInfo[]) => this.updateState(data))
    );
  }

  private updateState(data: MerchantInfo[]) {
    this.stateManager.updateState(data);
  }

  clearState() {
    this.stateManager.clearState();
  }
}
