import { PhotoType } from './photo-upload.enums';

export interface PhotoUploadConfig {
  label: string;
  altText: string;
  defaultPhotoSrc: string;
  defaultPhotoAlt: string;
  photoDimensions?: {
    width: number;
    height: number;
  };
}

export const PHOTO_UPLOAD_CONFIG: { [key: number]: PhotoUploadConfig } = {
  [PhotoType.PROFILE]: {
    label: 'New Photo',
    altText: 'get_mobile.photo_upload.user_photo_pending',
    defaultPhotoSrc: '/assets/images/profile-image-default.svg',
    defaultPhotoAlt: 'get_mobile.photo_upload.no_user_photo_pending',
    photoDimensions: { width: 132, height: 178 },
  },
  [PhotoType.CURRENT]: {
    label: 'Current Photo',
    altText: 'get_mobile.photo_upload.user_photo_current',
    defaultPhotoSrc: '/assets/images/profile-image-default.svg',
    defaultPhotoAlt: 'get_mobile.photo_upload.no_user_photo_pending',
    photoDimensions: { width: 132, height: 178 },
  },
  [PhotoType.GOVT_ID_BACK]: {
    label: 'Back of ID',
    altText: 'Government Id Back',
    defaultPhotoSrc: '/assets/images/govt-id-back.svg',
    defaultPhotoAlt: 'Government Id Back',
  },
  [PhotoType.GOVT_ID_FRONT]: {
    label: 'Front of ID',
    altText: 'Government Id Front',
    defaultPhotoSrc: '/assets/images/govt-id-front.svg',
    defaultPhotoAlt: 'Government Id Front',
  },
};
