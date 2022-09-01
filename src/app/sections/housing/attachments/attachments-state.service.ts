import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Attachment, AttachmentsDetail, ImageData, AttachmentTypes, AttachmentsList } from './attachments.model';

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
    attachmentUrl: null,
    notes: null,
    termKey: 0
    });
  public attachmentDetails: BehaviorSubject<AttachmentsDetail> = new BehaviorSubject<AttachmentsDetail>(this._defaultStateDetails);
  public attachment: BehaviorSubject<Attachment> = new BehaviorSubject<Attachment>(this._defaultState);
  public attachmentTypes: BehaviorSubject<AttachmentTypes[]> = new BehaviorSubject<AttachmentTypes[]>(null);
  public attachmentImage: BehaviorSubject<ImageData> = new BehaviorSubject<ImageData>(null);
  public attachmentList: BehaviorSubject<AttachmentsList[]> = new BehaviorSubject<AttachmentsList[]>(null);

  setAttachment(value: Attachment) {
    this.attachment.next(value);
  }

  setAttachmentDetails(attachmentDetails: AttachmentsDetail){
    this.attachmentDetails.next(attachmentDetails);
  }

  setAttachmentTypes(value: AttachmentTypes[]){
    this.attachmentTypes.next(value);
  }

  getSelectedAttachmentTypeName(selected: number) : string{
    return this.attachmentTypes.value.find(v => v['typeKey'] === selected)['name'];
  }

  setAttachmentImage(imageData: ImageData){
    this.attachmentImage.next(imageData);
  }

  destroyAttachmentImage(){
    this.attachmentImage.next(null);
  }

  getAttachmentImage() : string {
    return this.attachmentImage.value.attachmentFile;
  }

  setAttachmentImageBase(value) {
    return this.attachmentImage.value.attachmentFile = value ;
  }

  get attachment$(): BehaviorSubject<Attachment>{
    return this.attachment
  }

  setAttachmentList(value: AttachmentsList[]){
    this.attachmentList.next(value);
  }

  getAttachmentList(): BehaviorSubject< AttachmentsList[] >{
    return this.attachmentList;
  }

  findAttachment(key:number):AttachmentsList{
    return this.attachmentList.value.filter(list => list.attachmentKey == key)[0];
  }
}
