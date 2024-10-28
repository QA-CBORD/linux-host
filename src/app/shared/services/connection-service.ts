import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Observable, of, Subject, firstValueFrom, BehaviorSubject } from 'rxjs';
import { map, debounceTime, switchMap, catchError, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import {
  CONNECTION_ISSUES_MESSAGE,
  CONNECTION_TIME_OUT_MESSAGE,
  NO_INTERNET_STATUS_CODE,
  STATUS_CODE_SUCCESS,
  STATUS_MESSAGE_SUCCESS,
  TIME_OUT_DURATION,
} from '@shared/model/generic-constants';
import { RetryHandler } from '@shared/ui-components/no-connectivity-screen/model/connectivity-page.model';
import { Network } from '@capacitor/network';
import { ConnectivityErrorType } from '@shared/ui-components/no-connectivity-screen/model/connectivity-error.enum';

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  modalRefreshHandle: Subject<boolean> = new Subject();
  retrySubject: Subject<RetryHandler> = new Subject();
  private readonly networkStatusChangeSubject = new BehaviorSubject<boolean>(true);
  private networkStatusChange$ = this.networkStatusChangeSubject.asObservable();

  get online$() {
    return this.networkStatusChange$;
  }

  constructor(
    private http: HttpClient,
    private environmentFacade: EnvironmentFacadeService,
    public platform: Platform
  ) {
    this.initNetworkStatus();
    Network.addListener('networkStatusChange', status => {
      this.networkStatusChangeSubject.next(status.connected);
    });
  }

  private async initNetworkStatus() {
    const status = await Network.getStatus();
    this.networkStatusChangeSubject.next(status.connected);
  }

  public networkStatus(time = 300): Observable<boolean> {
    return this.online$.pipe(
      debounceTime(time),
      switchMap(async () => !(await this.deviceOffline()))
    );
  }

  async deviceOffline(): Promise<boolean> {
    if (!navigator.onLine) return true;

    return await firstValueFrom(
      this.http.head(this.environmentFacade.getServicesURL(), { observe: 'response' }).pipe(
        timeout(TIME_OUT_DURATION),
        map(res => this.isConnectionIssues({ message: res.statusText, status: res.status })),
        catchError(error => of(this.isConnectionIssues(error)))
      )
    );
  }

  async getOfflineStatus(): Promise<ConnectivityErrorType> {
    const status = await Network.getStatus();
    if (!status.connected) {
      return ConnectivityErrorType.DEVICE_CONNECTION;
    }

    const servicesOffline = await firstValueFrom(
      this.http.head(this.environmentFacade.getServicesURL(), { observe: 'response' }).pipe(
        timeout(TIME_OUT_DURATION),
        map(res => this.isConnectionIssues({ message: res.statusText, status: res.status }, true)),
        catchError(error => of(this.isConnectionIssues(error, true)))
      )
    );
    if (servicesOffline) {
      return ConnectivityErrorType.SERVER_CONNECTION;
    }

    return ConnectivityErrorType.NONE;
  }

  isConnectionIssues({ message, status }, isError?: boolean): boolean {
    const emptyResponse = status && Number(status) === STATUS_CODE_SUCCESS && STATUS_MESSAGE_SUCCESS.test(message) && isError;
    return CONNECTION_TIME_OUT_MESSAGE.test(message) || 
           CONNECTION_ISSUES_MESSAGE.test(message) || 
           (status !== null && Number(status) === NO_INTERNET_STATUS_CODE) || 
           emptyResponse;
  }
}
