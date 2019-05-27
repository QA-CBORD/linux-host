import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service/base.service';
import { Institution } from '../../model/institution/institution.model';
import { MessageResponse } from '../../model/service/message-response.model';
import { InstitutionPhotoInfo } from '../../model/institution/institution-photo-info.model';

@Injectable({
  providedIn: 'root',
})
export class InstitutionService extends BaseService {
  private readonly serviceUrl = '/json/institution';
  private readonly institutionInfo$: BehaviorSubject<Institution> = new BehaviorSubject<Institution>(null);
  private institution: Institution = null;
  private institutionPhoto: InstitutionPhotoInfo = null;

  private set _institutionData(institutionInfo: Institution) {
    if (this.institution === institutionInfo) return;
    this.institution = { ...institutionInfo };
    this.institutionInfo$.next({ ...this.institution });
  }

  get institutionData(): Observable<Institution> {
    return this.institutionInfo$.asObservable();
  }

  getInstitutionDataById(institutionId: string): Observable<Institution> {
    if (this.institution) {
      return this.institutionData;
    }

    return this.httpRequest<MessageResponse<Institution>>(this.serviceUrl, 'retrieve', true, { institutionId }).pipe(
      map(({ response }) => (this._institutionData = response))
    );
  }

  getInstitutionPhotoById(institutionId: string): Observable<InstitutionPhotoInfo> {
    if (this.institutionPhoto) return of({ ...this.institutionPhoto });

    return this.httpRequest<MessageResponse<InstitutionPhotoInfo>>(this.serviceUrl, 'retrieveInstitutionPhoto', true, {
      institutionId,
    }).pipe(map(({ response: photoInfo }) => (this.institutionPhoto = photoInfo)));
  }
}
