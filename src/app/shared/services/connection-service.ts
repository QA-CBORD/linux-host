import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, Observer, fromEvent, merge, of } from 'rxjs';
import { map, mapTo, debounceTime, switchMap } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { registerPlugin } from '@capacitor/core';
import { LoadingService } from '@core/service/loading/loading.service';
const DeviceConnection = registerPlugin<any>('HIDPlugin');

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {


  private online$: Observable<boolean> = undefined;

  constructor(private network: Network, public platform: Platform,
    private readonly loadingService: LoadingService) {
    this.online$ = new Observable(observer => observer.next(true)).pipe(mapTo(true));
    window['connectionService'] = this;
    if (this.platform.is('capacitor')) {
      this.network.downlinkMax
      // on Device
      this.online$ = merge(
        this.network.onConnect().pipe(mapTo(true)),
        this.network.onDisconnect().pipe(mapTo(false))
      );
    } else {
      // on Browser
      this.online$ = merge(
        of(navigator.onLine),
        fromEvent(window, 'online').pipe(mapTo(true)),
        fromEvent(window, 'offline').pipe(mapTo(false))
      );
    }
  }

  obsUserConnection$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }


  public getNetworkType(): string {
    return this.network.type;
  }

  public networkStatus(time: number = 300): Observable<boolean> {
    return this.online$.pipe(debounceTime(time), switchMap(async () => !(this.deviceOffline())));
  }

  public async deviceOffline(): Promise<boolean> {
    try {
      this.loadingService.showSpinner();
      const response = await DeviceConnection.isDeviceOnline();
      return !response.isDeviceOnline;
    } catch (error) {
      return true;
    } finally {
      this.loadingService.closeSpinner();
    }
  }

}
