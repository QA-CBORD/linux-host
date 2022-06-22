import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, Observer, fromEvent, merge, of, Subject } from 'rxjs';
import { map, mapTo, debounceTime, switchMap, catchError, timeout } from 'rxjs/operators';
import { Network } from '@ionic-native/network/ngx';
import { firstValueFrom } from '@shared/utils';
import { HttpClient } from '@angular/common/http';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { CONNECTION_TIME_OUT_MESSAGE, NO_INTERNET_STATUS_CODE, TIME_OUT_DURATION } from '@shared/model/generic-constants';
import { RetryHandler } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {


  modalRefreshHandle: Subject<boolean> = new Subject();
  retrySubject: Subject<RetryHandler> = new Subject();
  private online$: Observable<boolean> = undefined;

  constructor(private http: HttpClient,
    private environmentFacade: EnvironmentFacadeService,
    private network: Network,
    public platform: Platform) {

    this.online$ = new Observable(observer => observer.next(true)).pipe(mapTo(true));
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

  public networkStatus(time = 300): Observable<boolean> {
    return this.online$.pipe(debounceTime(time), switchMap(async () => !(await this.deviceOffline())));
  }

  async deviceOffline(): Promise<boolean> {
    if (!navigator.onLine) return true;

    return await firstValueFrom(this.http.head(this.environmentFacade.getServicesURL(), { observe: 'response' }).pipe(
      timeout(TIME_OUT_DURATION),
      map((res) => this.isConnectionIssues(<any>res)),
      catchError((error) => of(this.isConnectionIssues(error))))
    );
  }


  isConnectionIssues({ message, status }): boolean {
    return (CONNECTION_TIME_OUT_MESSAGE.test(message)) || status !== null && (Number(status) === NO_INTERNET_STATUS_CODE);
  }
}
