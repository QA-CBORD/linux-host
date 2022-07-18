import { isDefined } from '../utils';

export enum AttachmentsFields {
  DESCRIPTION = "DESCRIPTION",
  TYPE = "TYPE",
  NOTIFY_BY_EMAIL = "NOTIFY_BY_EMAIL",
  LOCATION= "LOCATION",
  PHONE_NUMBER = "CONTACT_PHONE_NUMBER",
  EMAIL = "EMAIL",
  IMAGE ="IMAGE",
  FACILITY = "FACILITY",
}

export interface ImageDataOptions {
  attachmentTypeKey: number;
  attachmentTypeName: string;
  fileName: string;
  attachmentFile: string;
  notes: string;
  fileLocalUrl: string;
  termKey: number;
}

export interface LocalFile {
  name: string;
  path: string;
  data: string;
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