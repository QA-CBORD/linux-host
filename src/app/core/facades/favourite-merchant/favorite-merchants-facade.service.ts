import { Injectable } from '@angular/core';
import { MerchantApiService } from '@core/service/merchant-api-service/merchant-api.service';
import { MerchantInfo } from '@sections/ordering';
import { Observable } from 'rxjs';
import { ServiceStateFacade } from '@core/classes/service-state-facade';
import { MerchantStateService } from '@core/states/merchant/merchant-state.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FavoriteMerchantsFacadeService extends ServiceStateFacade {
  private readonly stateManager = new MerchantStateService;

  constructor(private readonly apiService: MerchantApiService) {
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
      ? this.apiService.removeFavoriteMerchant(id).pipe(
        tap(() => this.stateManager.removeMerchantById(id)),
      )
      : this.apiService.addFavoriteMerchant(id);
  }

  fetchFavoritesMerchants$(): Observable<MerchantInfo[]> {
    const call = this.apiService.getFavoriteMerchants();

    return this.makeRequestWithUpdatingStateHandler<MerchantInfo[]>(call, this.stateManager)
      .pipe(tap(this.updateFavouriteMerchants.bind(this)));
  }

  private updateFavouriteMerchants(data: MerchantInfo[]) {
    this.stateManager.updateState(data);
  }
}
