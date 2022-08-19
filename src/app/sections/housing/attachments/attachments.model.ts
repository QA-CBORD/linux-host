import { isDefined } from '../utils';

export interface ImageDataOptions {
  attachmentTypeKey: number;
  attachmentTypeName: string;
  fileName: string;
  attachmentFile: string;
  notes: string;
  fileLocalUrl: string;
  termKey: number;
}

export class ImageData implements ImageDataOptions {
  attachmentTypeKey: number;
  attachmentTypeName: string;
  fileName: string;
  attachmentFile: string;
  notes: string;
  fileLocalUrl: string;
  termKey: number;
  constructor(options: ImageDataOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as ImageDataOptions;
    }
    this.notes = String(options.notes);
    this.attachmentTypeName = String(options.attachmentTypeName);
    this.fileName = String(options.fileName);
    this.attachmentFile = String(options.attachmentFile);
    this.attachmentTypeKey = Number(options.attachmentTypeKey);
    this.termKey = Number(options.termKey);
  }
}

export interface AttachmentsDetailOptions {
  attachmentTypeKey:number;
  attachmentTypeName: string;
  fileName: string;
  attachmentFile: string;
  notes: string;
  termKey: number;
}
export class AttachmentsDetail implements AttachmentsDetailOptions {
  attachmentTypeKey: number;
  attachmentTypeName: string;
  fileName: string;
  attachmentFile: string;
  notes: string;
  termKey: number;
  constructor(options: AttachmentsDetailOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as AttachmentsDetailOptions;
    }
    this.attachmentTypeKey = Number(options.attachmentTypeKey);
    this.attachmentTypeName = String(options.attachmentTypeName);
    this.fileName = String(options.fileName);
    this.attachmentFile = String(options.attachmentFile);
    this.notes = String(options.notes);
    this.termKey = Number(options.termKey);
  }
}
export interface AttachmentOptions {
  canSubmit: boolean,
  Attachments: AttachmentsDetail[],
}

export class Attachment implements AttachmentOptions{
  canSubmit: boolean;
  Attachments: AttachmentsDetail[];
  constructor(options: AttachmentOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as AttachmentOptions;
    }
    this.canSubmit = Boolean(options.canSubmit)
    this.Attachments = Array.isArray(options.Attachments)
      ? options.Attachments.map((detail: any) => new AttachmentsDetail(detail))
      : [];
  }
  
}

export interface AttachmentTypesOptions{
  typeKey: number,
  name: string
}

export class AttachmentTypes implements AttachmentTypesOptions{
  typeKey: number;
  name: string;
  constructor(options: AttachmentTypesOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as AttachmentTypesOptions;
    }
    this.typeKey = Number(options.typeKey)
    this.name = String(options.name);
  }
}

export interface AttachmentsListOptions {
  attachmentKey:number;
  fileName: string;
  attachmentType: string;
  comments: string;
  attachmentDate: string;
}

export class AttachmentsList implements AttachmentsListOptions {
  attachmentKey:number;
  fileName: string;
  attachmentType: string;
  comments: string;
  attachmentDate: string;
  constructor(options: AttachmentsListOptions) {
    if (!isDefined(options) || typeof options !== 'object') {
      options = {} as AttachmentsListOptions;
    }
    this.attachmentKey = Number(options.attachmentKey);
    this.attachmentType = String(options.attachmentType);
    this.fileName = String(options.fileName);
    this.attachmentDate = String(options.attachmentDate);
    this.comments = String(options.comments);
  }

}

export interface AttachmentsListDataOptions{
  data: AttachmentsList[]
}
export class AttachmentsListData implements AttachmentsListDataOptions {
  data : AttachmentsList[];
  constructor(options: AttachmentsListDataOptions) {
    if (options == null || typeof options !== 'object') {
      options = {} as AttachmentsListDataOptions;
    }
    this.data = Array.isArray(options) ? options.map((detail: any) => new AttachmentsList(detail)): [];
  }
}