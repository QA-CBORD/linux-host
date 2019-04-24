import { MUserPhotoInfo } from './user-photo-info.interface';

export interface UserPhotoList {
  readonly empty: boolean;
  readonly list: MUserPhotoInfo[];
}
