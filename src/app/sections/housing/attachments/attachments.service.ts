import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { of, Observable } from "rxjs";
import { Attachment, AttachmentsDetail, AttachmentTypes } from './attachments.model';
import { generateAttachments } from './attachments.mock';
import { map } from 'rxjs/operators';


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

  getAttachmentTypes(): Observable<AttachmentTypes[]>{
    const apiUrl = `${this.AttachmentApiUrl}/attachment-types`;
    return this._housingProxyService.get<AttachmentTypes[]>(apiUrl);
  }

  getAttachments(): Observable<Attachment> {
    return of(this.Attachments);
  }


  sendAttachmentImage(dataAttachmentsDetail: FormData) {
    return this._housingProxyService
      .post<AttachmentsDetail>(this.AttachmentApiUrl, dataAttachmentsDetail);
  }

  getAttachmentFile(attachmentKey?: number) {
    const apiUrl = `${this.AttachmentApiUrl}/${attachmentKey}/file/internal`
    return this._housingProxyService.get<string>(apiUrl).pipe(map(res => res));
  }

  deleteAttachmentFile(attachmentKey?: number) {
    const apiUrl = `${this.AttachmentApiUrl}`
    return this._housingProxyService.delete(apiUrl,attachmentKey).pipe(map(res => res));
  }
}