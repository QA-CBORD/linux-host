import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { of, Observable } from "rxjs";
import { Attachment, AttachmentsDetail, AttachmentTypes } from './attachments.model';
import { generateAttachments } from './attachments.mock';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  private AttachmentApiUrl = `${this._environment.getHousingAPIURL()
    }/patron-applications/v.1.0/patron-attachment`;
  Attachments: Attachment = generateAttachments(5);


  constructor(
    private _environment: EnvironmentFacadeService,
    private _housingProxyService: HousingProxyService,
  ) { }

  getAttachmentTypes(): Observable<AttachmentTypes[]> {
    const apiUrl = `${this.AttachmentApiUrl}/attachment-types`;
    return this._housingProxyService.get<AttachmentTypes[]>(apiUrl);
  }

  getAttachments(): Observable<Attachment> {
    return of(this.Attachments);
  }


  sendAttachmentImage(dataAttachmentsDetail: FormData, attachmentUrl: string) {
    return this._housingProxyService
      .postAttachment<AttachmentsDetail>(attachmentUrl, dataAttachmentsDetail).pipe(catchError(() => of(null)));
  }

  sendAttachmentData(dataAttachmentsDetail: AttachmentsDetail): Observable<AttachmentsDetail> {
    return this._housingProxyService
      .post<AttachmentsDetail>(this.AttachmentApiUrl, dataAttachmentsDetail).pipe(catchError(() => of(null)));
  }

  getAttachmentFile(attachmentKey?: number) {
    const apiUrl = `${this.AttachmentApiUrl}/${attachmentKey}/file`;
    return this._housingProxyService.get<string>(apiUrl).pipe(map(res => res));
  }

  getUrlAttachmentFile() {
    const apiUrl = `${this.AttachmentApiUrl}/token`;
    return this._housingProxyService.get<string>(apiUrl).pipe(
      catchError(() => of(null)),
      map(res => res));
  }

  deleteAttachmentFile(attachmentKey?: number) {
    const requestUrl = `${this.AttachmentApiUrl}?attachmentKey=${attachmentKey}`;
    return this._housingProxyService.delete(requestUrl).pipe(map(res => res));
  }
}
