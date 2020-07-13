import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ExploreService } from '@sections/explore/services/explore.service';
import { PATRON_NAVIGATION } from '../../../app.global';
import { map } from 'rxjs/operators';

@Injectable()
export class MerchantDetailsResolverService implements Resolve<boolean> {
  constructor(private readonly exploreService: ExploreService, private readonly router: Router) {}

  resolve(): Observable<boolean> {
    return this.router.routerState.snapshot.url.includes(PATRON_NAVIGATION.explore)
      ? of(true)
      : this.exploreService.getInitialMerchantData$().pipe(map(() => true));
  }
}
