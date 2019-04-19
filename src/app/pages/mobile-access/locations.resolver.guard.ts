import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Resolve } from '@angular/router/src/interfaces';

import { switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { CoordsService } from '../../core/service/coords/coords.service';
import { MGeoCoordinates } from '../../core/model/geolocation/geocoordinates.interface';
import { MobileAccessService } from './service/mobile-access.service';
import * as Globals from '../../app.global';
import { MMobileLocationInfo } from './model/mobile-access.interface';

@Injectable()
export class LocationsResolverGuard implements Resolve<Observable<MMobileLocationInfo[] | boolean>> {
  private readonly spinnerMessage = 'Retrieving locations...';

  constructor(
    private readonly coords: CoordsService,
    private readonly mobileAccessService: MobileAccessService,
    private readonly events: Events,
    private readonly router: Router
  ) {}

  resolve(): Observable<MMobileLocationInfo[] | boolean> {
    const snapshot = this.router.routerState.snapshot;
    if (!snapshot.url.includes('activate')) return this.downloadData();
    return of(true);
  }

  private downloadData(): Observable<MMobileLocationInfo[]> {
    this.spinnerHandler(true);
    return this.coords.initCoords().pipe(
      switchMap((coords: MGeoCoordinates) => this.mobileAccessService.getLocations(coords)),
      tap(() => this.spinnerHandler())
    );
  }

  private spinnerHandler(started: boolean = false) {
    const start = {
      bShow: true,
      message: this.spinnerMessage,
    };
    const stop = { bShow: false };

    const loaderArgs = started ? start : stop;

    this.events.publish(Globals.Events.LOADER_SHOW, loaderArgs);
  }
}
