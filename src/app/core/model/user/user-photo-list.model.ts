import { UserPhotoInfo } from './user-photo-info.model';

export interface UserPhotoList {
  readonly empty: boolean;
  readonly list: UserPhotoInfo[];
}
