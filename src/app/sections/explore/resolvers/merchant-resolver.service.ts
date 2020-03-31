import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MerchantInfo } from '@sections/ordering';
import { Observable } from 'rxjs';
import { ExploreService } from '@sections/explore/services/explore.service';

@Injectable()
export class MerchantResolverService implements Resolve<Observable<[MerchantInfo[], MerchantInfo[], MerchantInfo[]]>> {

  constructor(private readonly exploreService: ExploreService) {
  }

  resolve(): Observable<[MerchantInfo[], MerchantInfo[], MerchantInfo[]]> {
    return this.exploreService.getInitialMerchantData$();
  }
}
