import { Injectable } from "@angular/core";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { of, Observable } from "rxjs";
import { Attachment, AttachmentsDetail, ImageData, AttachmentsFields, AttachmentTypes } from './attachments.model';
import { generateAttachments } from './attachments.mock';
import { Filesystem, Directory as FilesystemDirectory } from '@capacitor/filesystem';
import { DomSanitizer } from '@angular/platform-browser';


const IMAGE_DIR = 'stored-images';
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

  getAttachmentTypes() {
    //TODO: change url work orders
    const apiUrl = `${this.AttachmentApiUrl}/attachment-types`;
    return this._housingProxyService.get<AttachmentTypes[]>(apiUrl);
  }

  getAttachments(): Observable<Attachment> {
    return of(this.Attachments);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next(formValue: any): Observable<any> {
    return of(true);
  }

  sendAttachmentImage(dataAttachmentsDetail: FormData ){
    
    return this._housingProxyService
    .post<AttachmentsDetail>(this.AttachmentApiUrl, dataAttachmentsDetail);
      
  }


  async deleteImage() {
    await Filesystem.rmdir({
        directory: FilesystemDirectory.Data,
        path: `${IMAGE_DIR}`,
        recursive: true
    });
  }

}