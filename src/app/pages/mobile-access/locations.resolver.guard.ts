import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Events } from '@ionic/angular';
import { Resolve } from '@angular/router/src/interfaces';

import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CoordsService } from '../../core/service/coords/coords.service';
import { MGeoCoordinates } from '../../core/model/geolocation/geocoordinates.interface';
import { MobileAccessService } from './service/mobile-access.service';
import * as Globals from '../../app.global';

@Injectable()
export class LocationsResolverGuard implements Resolve<Observable<any>> {
  private readonly spinnerMessage = 'Retrieving locations...';

  constructor(
    private readonly coords: CoordsService,
    private readonly mobileAccessService: MobileAccessService,
    private readonly events: Events
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.downloadHandler(true);

    return this.coords.initCoords().pipe(
      switchMap((coords: MGeoCoordinates) => this.mobileAccessService.getMobileLocations(coords)),
      tap(() => this.downloadHandler())
    );
  }

  private downloadHandler(started: boolean = false) {
    const start = {
      bShow: true,
      message: this.spinnerMessage,
    };
    const stop = { bShow: false };

    const loaderArgs = started ? start : stop;

    this.events.publish(Globals.Events.LOADER_SHOW, loaderArgs);
  }
}
