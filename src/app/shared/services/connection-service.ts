import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, Observer, fromEvent, merge, of } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private online$: Observable<boolean> = undefined;

  constructor(public network: Network, public platform: Platform) {
    this.online$ = Observable.create(observer => observer.next(true)).pipe(mapTo(true));

    console.log(this.platform)

    if (this.platform.is('capacitor')) {
        // on Device

        console.log('is capacitor')
        this.online$ = merge(
            this.network.onConnect().pipe(mapTo(true)),
            this.network.onDisconnect().pipe(mapTo(false))
        );
    } else {
        // on Browser

        console.log('is web')
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

  public networkStatus(): Observable<boolean> {
      return this.online$;
  }
}
