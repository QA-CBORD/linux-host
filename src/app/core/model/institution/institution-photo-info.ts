export interface InstitutionPhotoInfo {
  readonly id: string;
  readonly externalId: string;
  readonly institutionId: string;
  readonly mimeType: string;
  readonly status: number;
  readonly statusReason: string;
  readonly data: string;
  readonly version: number;
  readonly insertTime: Date;
  readonly lastUpdated: Date;
}
