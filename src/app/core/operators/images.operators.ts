import { GeneralPhoto } from '@core/model/general-photo/general-photo.model';
import { getDataUrlFromPhoto } from '@core/utils/general-helpers';
import { Observable, OperatorFunction } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';

/**
 * Returns an operator function that transforms an Observable of GeneralPhoto objects into an Observable of data URLs. Will skip over any null or undefined values.
 * @returns An operator function that takes an Observable of GeneralPhoto objects and returns an Observable of data URLs.
 */
export function getPhotoDataUrl(): OperatorFunction<GeneralPhoto, string | null> {
  return (source: Observable<GeneralPhoto>) =>
    source.pipe(
      skipWhile(photoInfo => !photoInfo || photoInfo === null),
      map(photoInfo => getDataUrlFromPhoto(photoInfo))
    );
}
