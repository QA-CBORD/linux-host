import { Pipe, PipeTransform } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { NavigationBottomBarElement } from '@core/model/navigation/navigation-bottom-bar-element';
import { Observable } from 'rxjs';

@Pipe({
  name: 'isActiveRouteInList',
  standalone: true
})
export class IsActiveRouteInListPipe implements PipeTransform {

  constructor(private readonly router: Router) {
  }

  transform(navElems: NavigationBottomBarElement[], amountToCut: number): Observable<boolean> {
    const listItemUrls = navElems.slice(amountToCut - 1).map(({ url }) => `/${url}`);

    return this.router.events.pipe(
      map(routerEvent => {
          if (routerEvent instanceof NavigationEnd)
            return listItemUrls.includes(routerEvent.url.split('/').slice(0, 3).join('/'));
        },
      ),
      filter(val => val !== undefined));
  }
}
