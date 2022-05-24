import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PATRON_NAVIGATION } from '../../../../app.global';
import { from, Observable, of, zip } from 'rxjs';
import { catchError, finalize, first, switchMap, take, tap } from 'rxjs/operators';
import { UserPhotoInfo } from '@core/model/user';
import { PhotoStatus, PhotoType, PhotoUploadService } from '../services/photo-upload.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ActionSheetController } from '@ionic/angular';
import { PhotoCropModalService } from '../services/photo-crop.service';
import { Orientation } from '../photo-crop-modal/photo-crop-modal.component';
import { CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraService } from '../services/camera.service';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';

export enum LocalPhotoStatus {
  NONE,
  PENDING,
  ACCEPTED,
  NEW,
  SUBMITTED,
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

@Component({
  selector: 'st-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss'],
})
export class PhotoUploadComponent implements OnInit {
  govIdFront$: Observable<SafeResourceUrl>;
  govIdBack$: Observable<SafeResourceUrl>;
  profileImage$: Observable<SafeResourceUrl>;
  profileImagePending$: Observable<SafeResourceUrl>;

  submitButtonDisabled: boolean = true;
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
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly cd: ChangeDetectorRef,
    private readonly photoCropModalService: PhotoCropModalService,
    private readonly cameraService: CameraService
  ) {}

  ngOnInit() {
    this.clearLocalStateData();
    this.getPhotoData();
    this.setupPhotoSubscriptions();
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
        data => {},
        error => {
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
      switch (photoInfo.status) {
        case PhotoStatus.PENDING:
          status = LocalPhotoStatus.PENDING;
          break;
        case PhotoStatus.ACCEPTED:
          status = LocalPhotoStatus.ACCEPTED;
          break;
      }
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
  private formatPhotoData({ mimeType, data }: UserPhotoInfo): SafeResourceUrl {
    return this.domsanitizer.bypassSecurityTrustResourceUrl(`data:${mimeType};base64,${data}`);
  }

  get localPhotoStatus() {
    return LocalPhotoStatus;
  }

  get photoType() {
    return PhotoType;
  }

  async presentPhotoTypeSelection(photoType: PhotoType) {
    const photoSourceAS = await this.actionSheetCtrl.create({
      keyboardClose: true,
      backdropDismiss: true,
      buttons: [
        {
          text: 'Take photo',
          role: 'take-photo',
          icon: '/assets/icon/camera-outline.svg',
        },
        {
          text: 'Choose existing photo',
          role: 'select-photo',
          icon: '/assets/icon/select-photo.svg',
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await photoSourceAS.present();

    let cameraSource: CameraSource = null;

    await photoSourceAS.onWillDismiss().then(result => {
      if (result.role === 'take-photo') {
        cameraSource = CameraSource.Camera;
      } else if (result.role === 'select-photo') {
        cameraSource = CameraSource.Photos;
      }
    });

    if (!cameraSource) {
      return;
    }

    this.onGetPhoto(photoType, cameraSource);
  }

  /// handle request to take new photo
  async onGetPhoto(photoType: PhotoType, cameraSource: CameraSource) {
    const uploadSettings = this.photoUploadService.photoUploadSettings;
    from(
      this.cameraService.getPhoto({
        quality: 100,
        correctOrientation: true,
        preserveAspectRatio: true,
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
          this.photoCropModalService.show(response.dataUrl, photoType).then(dataUrl => {
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
    await this.loadingService.showSpinner();
    let newPhotos: Observable<boolean>[] = [];

    if (this.localPhotoUploadStatus.profilePending === LocalPhotoStatus.NEW) {
      newPhotos.push(
        this.createPhotoSubmissionObservable(
          PhotoType.PROFILE,
          'There was an issue submitting your profile photo - please try again'
        )
      );
    }

    if (this.localPhotoUploadStatus.govIdFront === LocalPhotoStatus.NEW) {
      newPhotos.push(
        this.createPhotoSubmissionObservable(
          PhotoType.GOVT_ID_FRONT,
          'There was an issue submitting your government id photo (front) - please try again'
        )
      );
    }

    if (this.localPhotoUploadStatus.govIdBack === LocalPhotoStatus.NEW) {
      newPhotos.push(
        this.createPhotoSubmissionObservable(
          PhotoType.GOVT_ID_BACK,
          'There was an issue submitting your government id photo (back) - please try again'
        )
      );
    }

    zip(...newPhotos)
      .pipe(take(1))
      .subscribe(
        data => {},
        error => {},
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
      catchError(error => {
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
    await this.toastService.showToast({
      message: 'There was an issue retrieving your photo information - please try again',
      duration: 5000,
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
    return orientation === Orientation.PORTRAIT ? false : true;
  }
}
