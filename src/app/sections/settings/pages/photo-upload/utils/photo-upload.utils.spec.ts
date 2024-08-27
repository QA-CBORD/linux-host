import { mapUserPhotosInList } from './photo-upload.utils';
import { UserPhotoList } from '@core/model/user';
import { PhotoStatus } from '../models/photo-upload.enums';

describe('mapUserPhotosInList', () => {
  it('should return an empty array when the photo list is empty', () => {
    const photoList: UserPhotoList = { list: [] } as any as UserPhotoList;
    const result = mapUserPhotosInList(photoList);
    expect(result).toEqual([]);
  });

  it('should return photos grouped by status and sorted by date', () => {
    const photoList: UserPhotoList = {
      list: [
        { status: PhotoStatus.ACCEPTED, insertTime: '2023-01-01T00:00:00Z' },
        { status: PhotoStatus.PENDING, insertTime: '2023-01-02T00:00:00Z' },
        { status: PhotoStatus.REJECTED, insertTime: '2023-01-03T00:00:00Z' },
        { status: PhotoStatus.ACCEPTED, insertTime: '2023-01-04T00:00:00Z' },
        { status: PhotoStatus.PENDING, insertTime: '2023-01-05T00:00:00Z' },
      ],
    } as any as UserPhotoList;

    const result = mapUserPhotosInList(photoList);
    const expected = [
      { status: PhotoStatus.ACCEPTED, insertTime: '2023-01-04T00:00:00Z' },
      { status: PhotoStatus.PENDING, insertTime: '2023-01-05T00:00:00Z' },
      { status: PhotoStatus.REJECTED, insertTime: '2023-01-03T00:00:00Z' },
    ];
    expected.sort((a, b) => new Date(b.insertTime).getTime() - new Date(a.insertTime).getTime());
    result.sort((a, b) => new Date(b.insertTime).getTime() - new Date(a.insertTime).getTime());

    console.log(result);
    expect(result).toStrictEqual(expected);
  });

  it('should return an empty array when no photos have valid statuses', () => {
    const photoList: UserPhotoList = {
      list: [{ status: 'INVALID_STATUS', insertTime: '2023-01-01T00:00:00Z' }],
    } as any as UserPhotoList;

    const result = mapUserPhotosInList(photoList);
    expect(result).toEqual([]);
  });
});
