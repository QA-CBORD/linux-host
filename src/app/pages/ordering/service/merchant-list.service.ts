import {
  MerchantSearchOptions,
  MerchantSearchOptionName,
  MerchantSearchOption,
} from './../models/merchant-search-options';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, zip } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';

import { MerchantApiService } from './merchant.api.service';

import { MerchantInfo } from '../models/merchant-info';

@Injectable()
export class MerchantListService {
  private readonly _menuMerchants$: BehaviorSubject<MerchantInfo[]> = new BehaviorSubject<MerchantInfo[]>([]);

  constructor(private readonly orderingApiService: MerchantApiService) {}

  get menuMerchants$(): Observable<MerchantInfo[]> {
    return this._menuMerchants$.asObservable();
  }

  private set _menuMerchants(value: MerchantInfo[]) {
    this._menuMerchants$.next([...value]);
  }

  getMenuMerchants(): Observable<MerchantInfo[]> {
    const searchOptions: MerchantSearchOptions = new MerchantSearchOptions();
    const op: MerchantSearchOption = {
      key: MerchantSearchOptionName.INCLUDE_SETTINGS,
      value: 1,
    };

    searchOptions.addSearchOption(op);

    return this.orderingApiService
      .getMenuMerchants(searchOptions)
      .pipe(tap(merchantList => (this._menuMerchants = merchantList)));
  }

  getMerchantsWithFavoriteInfo(): Observable<MerchantInfo[]> {
    const searchOptions: MerchantSearchOptions = new MerchantSearchOptions();
    searchOptions.addSearchOption({
      key: MerchantSearchOptionName.INCLUDE_SETTINGS,
      value: 1,
    });

    let resultHandler = (favoriteMerchants: string[], merchantList: MerchantInfo[]): MerchantInfo[] => {
      if(!favoriteMerchants || favoriteMerchants.length <= 0){
        this._menuMerchants = merchantList;
        return merchantList;
      }
      merchantList.forEach(merchant => (merchant.isFavorite = favoriteMerchants.includes(merchant.id)));
      this._menuMerchants = merchantList;
      return merchantList;
    };

    return zip(
      this.orderingApiService.getFavoriteMerchants(),
      this.orderingApiService.getMenuMerchants(searchOptions),
      resultHandler
    );
  }
}
