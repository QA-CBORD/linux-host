import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { skipWhile, take } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { PLATFORM } from '@shared/accessibility/services/accessibility.service';
import { AndroidPermissionsService } from '@sections/dashboard/services/android-permissions.service';
import { LoadingService } from '../loading/loading.service';
import { Position, Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class CoordsService {
  private readonly fetchInterval: number = 5000;
  private timestamp: number = 0;

  private latestPosition: Position | any = {
    timestamp: null,
    coords: {
      accuracy: null,
      latitude: null,
      longitude: null,
    },
  };
  private readonly _location$: BehaviorSubject<Position> = new BehaviorSubject<Position>(undefined);
  private readonly emptyPosition: Position | any = {
    timestamp: null,
    coords: {
      accuracy: null,
      latitude: null,
      longitude: null,
    },
  };

  constructor(
    private readonly appPermissions: AndroidPermissionsService,
    private readonly loadingService: LoadingService
  ) {}

  get location$(): Observable<Position> {
    return this._location$.asObservable().pipe(skipWhile(value => !value));
  }

  set _latestLocation(position: Position) {
    this.latestPosition = { ...position };
    this._location$.next(this.latestPosition);
  }

  /// get device coordinates
  getCoords(): Observable<Position> {
    /// use time delay to request location from device every 5 seconds, otherwise subscribe to behavior subject
    /// this prevents several simultaneous requests to the device
    const timeDiff = new Date().getTime() - this.timestamp;
    if (timeDiff > this.fetchInterval) {
      if (Capacitor.getPlatform() == PLATFORM.android) {
        (async () => {
          await this.appPermissions.checkLocationPermission().then(result => {
            if (result.hasPermission) {
              this.requestLocationFromDevice();
            } else if (this.appPermissions.permissionDismissed) {
              this.requestLocationFromDevice();
              this.appPermissions.permissionDismissed = false;
            } else {
              this.emptyPositions();
            }
          });
        })();
      } else {
        this.requestLocationFromDevice();
      }
    }
    return this.location$;
  }

  private async requestLocationFromDevice() {
    await this.loadingService.showSpinner();
    this.timestamp = new Date().getTime();

    const options = {
      enableHighAccuracy: true,
      timeout: 5,
    };
    from(Geolocation.getCurrentPosition(options))
      .pipe(take(1))
      .subscribe(
        resp => {
          this._latestLocation = resp;
        },
        () => {
          /// clear timestamp and return empty position so we can try another request
          this.emptyPositions();
        }
      );
    await this.loadingService.closeSpinner();
  }

  private emptyPositions() {
    this.timestamp = 0;
    this._latestLocation = this.emptyPosition;
  }
}
