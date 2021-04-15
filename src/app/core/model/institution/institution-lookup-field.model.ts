export enum LookupFieldType {
  UNDEFINED = -1,
  MEDIA_VALUE = 1,
  DATE = 2,
  STRING_EXACT = 3,
  STRING_IGNORECASE = 4,
  STRING_FUZZY = 5,
  MMID_USID = 6,
}

export class LookupFieldInfo {
  lookupFieldId: string;
  displayName: string;
  displayOrder: number;
  type: LookupFieldType;
  value: string;
}
