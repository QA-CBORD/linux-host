import { Injectable } from '@angular/core';
import { MerchantInfo } from '@sections/ordering';
import { Observable } from 'rxjs';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { MerchantStateService } from '@core/states/merchant/merchant-state.service';
import { tap } from 'rxjs/operators';
import { MerchantFacadeService } from '../merchant/merchant-facade.service';

@Injectable({
  providedIn: 'root',
})
export class FavoriteMerchantsFacadeService extends ServiceStateFacade {
  private readonly stateManager = new MerchantStateService();

  constructor(private readonly merchantFacadeService: MerchantFacadeService) {
    super();
  }

  get favoriteMerchants$(): Observable<MerchantInfo[]> {
    return this.stateManager.state$;
  }

  get isStateUpdating$(): Observable<boolean> {
    return this.stateManager.isUpdating$;
  }

  resolveFavoriteMerchant({ isFavorite, id }: MerchantInfo): Observable<string | boolean> {
    return isFavorite
      ? this.merchantFacadeService.removeFavoriteMerchant(id).pipe(tap(() => this.stateManager.removeMerchantById(id)))
      : this.merchantFacadeService.addFavoriteMerchant(id);
  }

  fetchFavoritesMerchants$(): Observable<MerchantInfo[]> {
    const call = this.merchantFacadeService.fetchFavoriteMerchants();

    return this.makeRequestWithUpdatingStateHandler<MerchantInfo[]>(call, this.stateManager).pipe(
      tap(this.updateFavouriteMerchants.bind(this))
    );
  }

  private updateFavouriteMerchants(data: MerchantInfo[]) {
    this.stateManager.updateState(data);
  }
}
