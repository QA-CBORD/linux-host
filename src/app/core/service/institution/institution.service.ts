import { Injectable } from '@angular/core';
import { BaseService } from '../base-service/base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Institution } from '../../model/institution/institution';
import { MessageResponse } from '../../model/service/message-response.interface';
import { InstitutionPhotoInfo } from '../../model/institution/institution-photo-info';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService extends BaseService {
  private readonly serviceUrl = '/json/institution';
  private readonly institutionInfo$: BehaviorSubject<Institution> = new BehaviorSubject<Institution>(null);

  set _institutionData(institutionInfo: Institution) {
    this.institutionInfo$.next({ ...institutionInfo });
  }

  get institutionData(): Observable<Institution> {
    return this.institutionInfo$.asObservable();
  }

  getInstitutionDataById(institutionId: string): Observable<Institution> {
    return this.httpRequest<MessageResponse<Institution>>(this.serviceUrl, 'retrieve', true, { institutionId }).pipe(
      tap(({ response }) => (this._institutionData = response)),
      map(({ response }) => response)
    );
  }

  getInstitutionPhotoInfoById(institutionId: string): Observable<MessageResponse<InstitutionPhotoInfo>> {
    return this.httpRequest<MessageResponse<InstitutionPhotoInfo>>(this.serviceUrl, 'retrieveInstitutionPhoto', true, {
      institutionId,
    });
  }
}
