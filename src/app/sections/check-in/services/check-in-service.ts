import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RPCQueryConfig } from '@core/interceptors/query-config.model';
import { ServiceParameters, MessageResponse } from '@core/model/service/message-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CheckingService {
  private readonly serviceUrlOrdering: string = '/json/ordering';
  public constructor(private readonly http: HttpClient) {}

  checkInOrder({ orderId, latitude, longitude, checkinBarcode }): Observable<boolean> {
    const postParams: ServiceParameters = { orderId, latitude, longitude, checkinBarcode };
    const queryConfig = new RPCQueryConfig('checkInOrder', postParams, true);

    return this.http
      .post(this.serviceUrlOrdering, queryConfig)
      .pipe(map(({ response }: MessageResponse<boolean>) => response));
  }
}
