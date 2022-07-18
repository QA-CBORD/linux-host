import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Attachment, AttachmentsDetail, ImageData, AttachmentTypes } from './attachments.model';

@Injectable({
  providedIn: 'root',
})
export class AttachmentStateService  {
  private readonly _defaultState = new Attachment ({
  canSubmit: null,
  Attachments: [],
  });
  private readonly _defaultStateDetails = new AttachmentsDetail ({
    attachmentTypeKey: 0,
    attachmentTypeName: null,
    fileName: null,
    attachmentFile: null,
    notes: null,
    termKey: 0
    });
  public attachmentDetails: BehaviorSubject<AttachmentsDetail> = new BehaviorSubject<AttachmentsDetail>(this._defaultStateDetails);
  public attachment: BehaviorSubject<Attachment> = new BehaviorSubject<Attachment>(this._defaultState);
  public attachmentTypes: BehaviorSubject<AttachmentTypes[]> = new BehaviorSubject<AttachmentTypes[]>(null);
  public attachmentImage: BehaviorSubject<ImageData> = new BehaviorSubject<ImageData>(null);
  public attachmentImageBlob: BehaviorSubject<FormData> = new BehaviorSubject<FormData>(null);

  setAttachment(value: Attachment) {
    this.attachment.next(value);
  }

  setAttachmentDetails(attachmentDetails: AttachmentsDetail){
    this.attachmentDetails.next(attachmentDetails);
  }

  setAttachmentTypes(value: AttachmentTypes[]){
    this.attachmentTypes.next(value);
  }

  getSelectedAttachmentTypeName(selected: number) {
    return this.attachmentTypes.value.find(v => v['typeKey'] === selected)['name'];
  }

  setAttachmentImage(imageData: ImageData){
    this.attachmentImage.next(imageData);
  }

  destroyAttachmentImage(){
    this.attachmentImage.next(null);
  }

  get attachmentImage$(){
    return this.attachmentImage;
  }

  getAttachmentImage() {
    return this.attachmentImage.value.attachmentFile;
  }

  setAttachmentImageBase(value) {
    console.log(value)
    return this.attachmentImage.value.attachmentFile = value ;
  }

  get attachment$(){
    return this.attachment
  }

  setAttachmentImageBlob(value: FormData){
    this.attachmentImageBlob.next(value)
  }

  destroyAttachmentImageBlob(){
    this.attachmentImageBlob.next(null);
  }
  
  get AttachmentImageBlob(){
    return this.attachmentImageBlob;
  }
}
