import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PATRON_NAVIGATION } from '../../../../app.global';
import { from, Observable, of, zip } from 'rxjs';
import { catchError, finalize, first, switchMap, take, tap } from 'rxjs/operators';
import { UserPhotoInfo } from '@core/model/user';
import { PhotoUploadService } from '../services/photo-upload.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { PhotoCropModalService } from '../services/photo-crop.service';
import { Orientation } from '../photo-crop-modal/photo-crop-modal.component';
import { CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraService } from '../services/camera.service';
import { getDataUrlFromPhoto } from '@core/utils/general-helpers';
import { TranslateFacadeService } from '@core/facades/translate/translate.facade.service';
import { TOAST_DURATION } from '@shared/model/generic-constants';
import { StHeaderModule } from '@shared/ui-components';
import { PhotoUploadStatusComponent } from './photo-upload-status/photo-upload-status.component';
import { PhotoUploadImageContainerComponent } from './photo-upload-image-container/photo-upload-image-container.component';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ImageCropModalModule } from '../photo-crop-modal/photo-crop.module';
import { TranslateModule } from '@ngx-translate/core';
import { IonContent, IonCard, IonCardHeader, IonIcon, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { PhotoStatus, PhotoType } from './models/photo-upload.enums';
import { registerPlugin } from '@capacitor/core';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { UserFacadeService } from '@core/facades/user/user.facade.service';

const IOSDevice = registerPlugin<any>('IOSDevice');
const AndroidDevice = registerPlugin<any>('AndroidDevice');

interface PhotoUploadInfo {
  userId: string;
  title: string;
  status: string;
}

export enum LocalPhotoStatus {
  NONE,
  PENDING,
  ACCEPTED,
  NEW,
  SUBMITTED,
  REJECTED,
}

enum PhotoEvents {
  PHOTO_UPLOAD_UPDATE = 'PHOTO_UPLOAD_UPDATE',
}

export interface LocalPhotoUploadStatus {
  govIdFront: LocalPhotoStatus;
  govIdBack: LocalPhotoStatus;
  profile: LocalPhotoStatus;
  profilePending: LocalPhotoStatus;
}

export interface LocalPhotoData {
  govtIdRequired: boolean;
  govIdFront: UserPhotoInfo;
  govIdBack: UserPhotoInfo;
  profile: UserPhotoInfo;
  profilePending: UserPhotoInfo;
}

export interface Dimensions {
  height: number;
  width: number;
}

const PhotoTypeTranslateMap = {
  [PhotoType.PROFILE]: 'profile',
  [PhotoType.GOVT_ID_FRONT]: 'govt_id_front',
  [PhotoType.GOVT_ID_BACK]: 'govt_id_back',
};

@Component({
  selector: 'st-photo-upload',
  standalone: true,
  imports: [
    IonButton,
    IonCardContent,
    IonIcon,
    IonCardHeader,
    IonCard,
    IonContent,
    StHeaderModule,
    PhotoUploadStatusComponent,
    PhotoUploadImageContainerComponent,
    DeleteModalComponent,
    ImageCropModalModule,
    TranslateModule,
  ],
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss'],
})
export class PhotoUploadComponent implements OnInit {
  govIdFront$: Observable<SafeResourceUrl>;
  govIdBack$: Observable<SafeResourceUrl>;
  profileImage$: Observable<SafeResourceUrl>;
  profileImagePending$: Observable<SafeResourceUrl>;

  submitButtonDisabled = true;
  frontId: Dimensions;
  backId: Dimensions;
  fitCover: boolean;

  localPhotoUploadStatus: LocalPhotoUploadStatus;
  public localPhotoData: LocalPhotoData = {
    govtIdRequired: false,
    profile: null,
    profilePending: null,
    govIdBack: null,
    govIdFront: null,
  };

  constructor(
    private readonly router: Router,
    private readonly domsanitizer: DomSanitizer,
    private readonly toastService: ToastService,
    private readonly photoUploadService: PhotoUploadService,
    private readonly loadingService: LoadingService,
    private readonly cd: ChangeDetectorRef,
    private readonly photoCropModalService: PhotoCropModalService,
    private readonly translateService: TranslateFacadeService,
    private readonly cameraService: CameraService
  ) { }
  private readonly userFacadeService: UserFacadeService = inject(UserFacadeService);
  private readonly nativeProvider: NativeProvider = inject(NativeProvider);

  ngOnInit() {
    this.clearLocalStateData();
    this.photoUploadService.clearLocalPendingPhoto();
    this.getPhotoData();
    this.setupPhotoSubscriptions();
    this.updatePhotoUploadStatus();
  }

  ngOnDestroy() {
    IOSDevice.removeAllListeners();
    AndroidDevice.removeAllListeners();
  }

  ionViewWillEnter() {
    if (this.localPhotoUploadStatus.profile === LocalPhotoStatus.ACCEPTED) {
      this.localPhotoUploadStatus.profile = LocalPhotoStatus.NONE;
      this.photoUploadService.clearLocalGovernmentIdPhotos();
      this.photoUploadService.clearLocalProfilePhoto();
      this.getPhotoData();
    }
  }

  private clearLocalStateData() {
    this.localPhotoData = {
      govtIdRequired: false,
      govIdFront: null,
      govIdBack: null,
      profile: null,
      profilePending: null,
    };
    this.localPhotoUploadStatus = {
      govIdBack: LocalPhotoStatus.NONE,
      govIdFront: LocalPhotoStatus.NONE,
      profile: LocalPhotoStatus.NONE,
      profilePending: LocalPhotoStatus.NONE,
    };
  }

  /// initialize the observables for photo updating
  private getPhotoData() {
    this.loadingService.showSpinner();
    this.photoUploadService
      .getInitialPhotoData$()
      .pipe(
        finalize(() => {
          this.loadingService.closeSpinner();
          if (this.localPhotoUploadStatus.profile === LocalPhotoStatus.NONE) {
            this.photoUploadService.clearLocalGovernmentIdPhotos();
          }
        }),
        first()
      )
      .subscribe(
        () => {
          // TODO: Remove empty block
        },
        () => {
          this.photoDataFetchErrorToast();
        }
      );
  }

  private setupPhotoSubscriptions() {
    this.photoUploadService.governmentIdRequired$.subscribe(govtIdRequired => {
      this.localPhotoData.govtIdRequired = govtIdRequired;
      this.updateSubmitButtonStatus();
    });

    this.govIdFront$ = this.photoUploadService.govtIdFront$.pipe(
      tap(photoInfo => {
        this.updateLocalPhotoState(photoInfo, PhotoType.GOVT_ID_FRONT);
      }),
      switchMap(photoInfo => this.handlePhotoResponse(photoInfo))
    );
    this.govIdBack$ = this.photoUploadService.govtIdBack$.pipe(
      tap(photoInfo => {
        this.updateLocalPhotoState(photoInfo, PhotoType.GOVT_ID_BACK);
      }),
      switchMap(photoInfo => this.handlePhotoResponse(photoInfo))
    );
    this.profileImage$ = this.photoUploadService.profileImage$.pipe(
      tap(photoInfo => {
        this.updateLocalPhotoState(photoInfo, PhotoType.PROFILE);
      }),
      switchMap(photoInfo => this.handlePhotoResponse(photoInfo))
    );
    this.profileImagePending$ = this.photoUploadService.profileImagePending$.pipe(
      tap(photoInfo => {
        this.updateLocalPhotoState(photoInfo, PhotoType.PROFILE_PENDING);
      }),
      switchMap(photoInfo => this.handlePhotoResponse(photoInfo))
    );
  }

  /// make local modifications to allow UI to auto-update
  private updateLocalPhotoState(photoInfo: UserPhotoInfo, photoType: PhotoType) {
    this.setLocalPhotoData(photoInfo, photoType);
    this.getLocalPhotoStatus(photoInfo, photoType);
    this.updateSubmitButtonStatus();
    this.cd.detectChanges();
  }

  private setLocalPhotoData(photoInfo: UserPhotoInfo, photoType: PhotoType) {
    switch (photoType) {
      case PhotoType.PROFILE:
        this.localPhotoData.profile = photoInfo;
        break;
      case PhotoType.PROFILE_PENDING:
        this.localPhotoData.profilePending = photoInfo;
        if (
          (this.localPhotoData.govIdFront && this.localPhotoData.govIdFront.status === PhotoStatus.PENDING) ||
          (this.localPhotoData.govIdBack && this.localPhotoData.govIdBack.status === PhotoStatus.PENDING)
        ) {
          this.photoUploadService.clearLocalGovernmentIdPhotos();
        }
        break;
      case PhotoType.GOVT_ID_FRONT:
        this.localPhotoData.govIdFront = photoInfo;
        this.frontId = this.getGovIdDimension(this.photoUploadService.orientation);
        this.fitCover = this.coverBorderFit(this.photoUploadService.orientation);
        break;
      case PhotoType.GOVT_ID_BACK:
        this.localPhotoData.govIdBack = photoInfo;
        this.backId = this.getGovIdDimension(this.photoUploadService.orientation);
        this.fitCover = this.coverBorderFit(this.photoUploadService.orientation);
        break;
    }
  }

  /// get 'status' of photo for local state management
  private getLocalPhotoStatus(photoInfo: UserPhotoInfo, photoType: PhotoType) {
    let status: LocalPhotoStatus = LocalPhotoStatus.NONE;
    /// no photo data, no status
    if (photoInfo === null) {
      status = LocalPhotoStatus.NONE;
    } else if (photoInfo.status === null) {
      /// photo has been locally updated, not yet submitted
      status = LocalPhotoStatus.NEW;
    } else {
      /// photo has been fetched, use its status
      const photoStatusMap = {
        [PhotoStatus.PENDING]: LocalPhotoStatus.PENDING,
        [PhotoStatus.ACCEPTED]: LocalPhotoStatus.ACCEPTED,
        [PhotoStatus.REJECTED]: LocalPhotoStatus.REJECTED,
      };

      status = photoStatusMap[photoInfo.status];
    }

    switch (photoType) {
      case PhotoType.PROFILE:
        this.localPhotoUploadStatus.profile = status;
        break;
      case PhotoType.PROFILE_PENDING:
        this.localPhotoUploadStatus.profilePending = status;
        break;
      case PhotoType.GOVT_ID_FRONT:
        this.localPhotoUploadStatus.govIdFront = status;
        break;
      case PhotoType.GOVT_ID_BACK:
        this.localPhotoUploadStatus.govIdBack = status;
        break;
    }
  }

  /// manage photo data on response for display in html
  private handlePhotoResponse(photoInfo: UserPhotoInfo): Observable<SafeResourceUrl> {
    if (photoInfo === null) {
      return of(null);
    }
    return of(this.formatPhotoData(photoInfo));
  }

  /// format the photo data for display
  private formatPhotoData(photoData: UserPhotoInfo): SafeResourceUrl {
    return this.domsanitizer.bypassSecurityTrustResourceUrl(getDataUrlFromPhoto(photoData));
  }

  get localPhotoStatus() {
    return LocalPhotoStatus;
  }

  get photoType() {
    return PhotoType;
  }

  async presentPhotoTypeSelection(photoType: PhotoType) {
    const cameraSource = await this.photoUploadService.presentPhotoTypeSelection();
    this.onGetPhoto(photoType, cameraSource);
  }

  /// handle request to take new photo
  async onGetPhoto(photoType: PhotoType, cameraSource: CameraSource) {
    if (!cameraSource) return;

    const uploadSettings = this.photoUploadService.photoUploadSettings;
    from(
      this.cameraService.getPhoto({
        quality: 100,
        correctOrientation: true,
        width: uploadSettings.saveWidth ? uploadSettings.saveWidth : null,
        height: uploadSettings.saveHeight ? uploadSettings.saveHeight : null,
        direction: photoType === PhotoType.PROFILE ? CameraDirection.Front : CameraDirection.Rear,
        resultType: CameraResultType.DataUrl,
        source: cameraSource,
        saveToGallery: false,
      })
    )
      .pipe(take(1))
      .subscribe(
        response => {
          this.photoCropModalService.show(response?.dataUrl, photoType).then(dataUrl => {
            if (!dataUrl) return;
            const photoBase64 = dataUrl.split(',')[1];
            this.photoUploadService.onNewPhoto(photoType, photoBase64);
          });
        },
        () => {
          // There was an issue uploading the photo information'
        }
      );
  }

  private updateSubmitButtonStatus() {
    /*
    If we're uploading a new user profile photo check for government ID requirement.
    If we require govt ids then ensure they are being uploaded too
     */
    this.submitButtonDisabled = !(
      this.localPhotoUploadStatus.profilePending === LocalPhotoStatus.NEW &&
      (!this.localPhotoData.govtIdRequired ||
        (this.localPhotoUploadStatus.govIdFront === LocalPhotoStatus.NEW &&
          this.localPhotoUploadStatus.govIdBack === LocalPhotoStatus.NEW))
    );
  }

  //will submit all photos that have been uploaded
  async submitPhotos() {
    if (!this.validateLocalPhotosData()) return;

    await this.loadingService.showSpinner();
    const newPhotos: Observable<boolean>[] = [];

    if (this.localPhotoUploadStatus.govIdFront === LocalPhotoStatus.NEW) {
      newPhotos.push(
        this.createPhotoSubmissionObservable(
          PhotoType.GOVT_ID_FRONT,
          this.translateService.instant('get_mobile.photo_upload.invalid_photo_submission.govt_id_front')
        )
      );
    }

    if (this.localPhotoUploadStatus.govIdBack === LocalPhotoStatus.NEW) {
      newPhotos.push(
        this.createPhotoSubmissionObservable(
          PhotoType.GOVT_ID_BACK,
          this.translateService.instant('get_mobile.photo_upload.invalid_photo_submission.govt_id_back')
        )
      );
    }

    if (this.localPhotoUploadStatus.profilePending === LocalPhotoStatus.NEW) {
      newPhotos.push(
        this.createPhotoSubmissionObservable(
          PhotoType.PROFILE,
          this.translateService.instant('get_mobile.photo_upload.invalid_photo_submission.profile')
        )
      );
    }

    zip(...newPhotos)
      .pipe(take(1))
      .subscribe(
        () => {
          // TODO: Remove empty block
        },
        () => {
          // TODO: Remove empty block
        },
        () => {
          this.photoUploadService.clearLocalGovernmentIdPhotos();
          this.clearLocalStateData();
          this.loadingService.closeSpinner();
          this.getPhotoData();
        }
      );
  }

  /// create observable for submitting photo
  private createPhotoSubmissionObservable(photoType: PhotoType, toastErrorMessage: string): Observable<boolean> {
    let photoObservable: Observable<UserPhotoInfo>;

    switch (photoType) {
      case PhotoType.GOVT_ID_FRONT:
        photoObservable = of(this.localPhotoData.govIdFront);
        break;
      case PhotoType.GOVT_ID_BACK:
        photoObservable = of(this.localPhotoData.govIdBack);
        break;
      case PhotoType.PROFILE:
        photoObservable = of(this.localPhotoData.profilePending);
        break;
    }

    return photoObservable.pipe(
      switchMap(photoInfo => this.photoUploadService.submitPhoto(photoInfo)),
      catchError(() => {
        this.presentToast(toastErrorMessage);
        return of(false);
      })
    );
  }

  deletePendingProfileImage() {
    this.photoUploadService.presentDeletePhotoModal(this.localPhotoData.profilePending.id);
  }

  private async presentToast(message: string) {
    await this.toastService.showToast({ message, duration: 5000 });
  }

  private async photoDataFetchErrorToast() {
    await this.toastService.showError({
      message: 'There was an issue retrieving your photo information - please try again',
      toastButtons: [
        {
          side: 'end',
          text: 'Retry',
          handler: () => {
            this.clearLocalStateData();
            this.getPhotoData();
          },
        },
      ],
    });
  }

  navigateBack() {
    this.router.navigate([PATRON_NAVIGATION.settings], { replaceUrl: true });
  }

  private getGovIdDimension(orientation: Orientation): Dimensions {
    if (orientation === Orientation.PORTRAIT) {
      return { height: 178, width: 126 };
    } else if (orientation === Orientation.LANDSCAPE) {
      return { height: 80, width: 132 };
    } else {
      return { height: 132, width: 132 };
    }
  }

  private coverBorderFit(orientation: Orientation): boolean {
    return orientation !== Orientation.PORTRAIT;
  }

  validateLocalPhotosData(): boolean {
    if (!this.localPhotoData) return false;

    // Positions based on PhotoType enum values
    const photosData = [!!this.localPhotoData.profilePending?.data];
    if (this.localPhotoData.govtIdRequired) {
      photosData.push(...[this.localPhotoData.govIdFront, this.localPhotoData.govIdBack].map(photo => !!photo?.data));
    } else {
      photosData.push(true, true);
    }

    for (let photoDataIndex = 0; photoDataIndex < photosData.length; photoDataIndex++) {
      if (!photosData[photoDataIndex]) {
        this.toastService.showError({
          message: this.translateService.instant(
            `get_mobile.photo_upload.invalid_photo_submission.${PhotoTypeTranslateMap[photoDataIndex]}`
          ),
          duration: TOAST_DURATION,
        });
        return false;
      }
    }
    return true;
  }


  private async updatePhotoUploadStatus() {
    if (this.nativeProvider.isIos()) {
      await IOSDevice.addListener(PhotoEvents.PHOTO_UPLOAD_UPDATE, (info: PhotoUploadInfo) => {
        this.updatePhotoUpload(info);

      });
    } else if (this.nativeProvider.isAndroid()) {
      await AndroidDevice.addListener(PhotoEvents.PHOTO_UPLOAD_UPDATE, (info: PhotoUploadInfo) => {
        this.updatePhotoUpload(info);
      });
    }
  }

  private updatePhotoUpload(info: PhotoUploadInfo) {
    this.userFacadeService
      .getUserData$()
      .subscribe((response) => {
        if (response?.id === info?.userId) {
          if (info.status === 'ACCEPTED') {
            this.photoUploadService.clearLocalGovernmentIdPhotos();
            this.photoUploadService.clearLocalProfilePhoto();
          }
          this.getPhotoData();
        }
      });
  }
}
