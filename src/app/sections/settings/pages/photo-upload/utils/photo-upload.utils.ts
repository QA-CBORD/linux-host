import { UserPhotoList, UserPhotoInfo } from '@core/model/user';
import { PhotoStatus } from '../models/photo-upload.enums';

/// get photo data by status Accepted and Pending and Rejected
export function mapUserPhotosInList(photoList: UserPhotoList): UserPhotoInfo[] {
  const validPhotos = photoList.list.filter(({ status }) =>
    [PhotoStatus.ACCEPTED, PhotoStatus.PENDING, PhotoStatus.REJECTED].includes(status)
  );

  if (!validPhotos.length) {
    return [];
  }

  // Group photos by status and sort by date in ascending order
  const groupedPhotos = validPhotos.reduce((acc, photo) => {
    if (!acc[photo.status]) {
      acc[photo.status] = [];
    }
    acc[photo.status].push(photo);
    return acc;
  }, {});

  const sortedPhotos = Object.values(groupedPhotos).map(
    (photos: UserPhotoInfo[]) =>
      photos.sort((a, b) => new Date(b.insertTime).getTime() - new Date(a.insertTime).getTime())[0]
  );

  return sortedPhotos;

}
