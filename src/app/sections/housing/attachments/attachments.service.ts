import { Injectable } from "@angular/core";
import { environmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { of, Observable } from "rxjs";
import { Attachment, AttachmentsDetail, AttachmentTypes, AttachmentsList } from './attachments.model';
import { generateAttachments } from './attachments.mock';
import { Filesystem, Directory as FilesystemDirectory } from '@capacitor/filesystem';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { AttachmentStateService } from './attachments-state.service';


const IMAGE_DIR = 'stored-images';
@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  private AttachmentApiUrl = `${this._environment.getHousingAPIURL()
    }/patron-applications/v.1.0/patron-attachment`;
  Attachments: Attachment = generateAttachments(5);


  constructor(
    private _environment: environmentFacadeService,
    private _housingProxyService: HousingProxyService,
    private _attachmentStateService : AttachmentStateService,
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


  getAttachmentsListDetails(termKey?: number) {
    const apiUrl = `${this.AttachmentApiUrl}?termKey=${termKey}`
    return this._housingProxyService.get<AttachmentsList[]>(apiUrl).pipe(map(res => this._attachmentStateService.setAttachmentList(res)));
  }

  getAttachmentFile(attachmentKey?: number) {
    const apiUrl = `${this.AttachmentApiUrl}/${attachmentKey}/file/internal`
    return this._housingProxyService.get<string>(apiUrl).pipe(map(res => res));
  }
}