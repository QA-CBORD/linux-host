import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from '@core/service/loading/loading.service';
import { PhotoUploadService } from '@sections/settings/pages/services/photo-upload.service';
import { finalize, first } from 'rxjs/operators';
import { UserPhotoInfo } from '@core/model/user';

@Injectable()
export class PhotoUploadResolver implements Resolve<Observable<UserPhotoInfo[]>> {
  constructor(
    private readonly photoUploadService: PhotoUploadService,
    private readonly loadingService: LoadingService
  ) {}

  resolve(): Observable<UserPhotoInfo[]> {
    this.loadingService.showSpinner();
    return this.photoUploadService.getInitialPhotoData$().pipe(
      finalize(() => this.loadingService.closeSpinner()),
      first()
    );
  }
}
