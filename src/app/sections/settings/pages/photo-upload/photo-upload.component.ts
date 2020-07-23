import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CameraDirection, CameraPhoto, CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PATRON_NAVIGATION } from '../../../../app.global';
import { from, Observable, of, zip } from 'rxjs';
import { catchError, finalize, first, switchMap, take, tap } from 'rxjs/operators';
import { UserPhotoInfo } from '@core/model/user';
import { PhotoStatus, PhotoType, PhotoUploadService } from '../services/photo-upload.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';

const { Camera } = Plugins;

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
  govIdFront: UserPhotoInfo;
  govIdBack: UserPhotoInfo;
  profile: UserPhotoInfo;
  profilePending: UserPhotoInfo;
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

  localPhotoUploadStatus: LocalPhotoUploadStatus;
  private localPhotoData: LocalPhotoData;

  constructor(
    private readonly router: Router,
    private readonly domsanitizer: DomSanitizer,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly toastController: ToastController,
    private readonly photoUploadService: PhotoUploadService,
    private readonly loadingService: LoadingService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.clearLocalStateData();
    this.getPhotoData();
    this.setupPhotoSubscriptions();
  }

  private clearLocalStateData() {
    this.localPhotoData = {
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
        finalize(() => this.loadingService.closeSpinner()),
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
    // console.log('newPhotoDataToUI', photoInfo, photoType);
    this.setLocalPhotoData(photoInfo, photoType);
    this.getLocalPhotoStatus(photoInfo, photoType);
    this.updateSubmitButtonStatus();
  }

  private setLocalPhotoData(photoInfo: UserPhotoInfo, photoType: PhotoType) {
    if (photoInfo === null) {
      return;
    }

    switch (photoType) {
      case PhotoType.PROFILE:
        this.localPhotoData.profile = photoInfo;
        break;
      case PhotoType.PROFILE_PENDING:
        this.localPhotoData.profilePending = photoInfo;
        break;
      case PhotoType.GOVT_ID_FRONT:
        this.localPhotoData.govIdFront = photoInfo;
        break;
      case PhotoType.GOVT_ID_BACK:
        this.localPhotoData.govIdBack = photoInfo;
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
        case PhotoStatus.ACCEPTED:
          status = LocalPhotoStatus.ACCEPTED;
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
    this.cd.detectChanges();
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

  /// handle request to take new photo
  onTakePhoto(photoType: PhotoType) {
    this.getPhoto(photoType).subscribe(
      response => {
        this.photoUploadService.onNewPhoto(photoType, response);
      },
      error => {
        this.presentToast('There was an issue taking the picture - please try again');
      },
      () => {}
    );
  }

  private updateSubmitButtonStatus() {
    /* oh boy...
    {
      if one of the two govt images is accepted and the other is new
      OR
      both govt images are new
    }
    AND
    {
      if the profile photo is accepted
      OR
      if the profile photo is none and the pending profile photo is new
    }
    THEN submit
    */
    this.submitButtonDisabled = !(
      ((this.localPhotoUploadStatus.govIdFront === LocalPhotoStatus.NEW &&
        this.localPhotoUploadStatus.govIdBack === LocalPhotoStatus.ACCEPTED) ||
        (this.localPhotoUploadStatus.govIdFront === LocalPhotoStatus.ACCEPTED &&
          this.localPhotoUploadStatus.govIdBack === LocalPhotoStatus.NEW) ||
        (this.localPhotoUploadStatus.govIdFront === LocalPhotoStatus.NEW &&
          this.localPhotoUploadStatus.govIdBack === LocalPhotoStatus.NEW)) &&
      (this.localPhotoUploadStatus.profile === LocalPhotoStatus.ACCEPTED ||
        (this.localPhotoUploadStatus.profile === LocalPhotoStatus.NONE &&
          this.localPhotoUploadStatus.profilePending === LocalPhotoStatus.NEW))
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
      .pipe(
        take(1),
        finalize(() => this.loadingService.closeSpinner())
      )
      .subscribe(
        data => {
        },
        error => {
        },
        () => {
          this.clearLocalStateData();
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

  /// Camera plugin control
  private getPhoto(photoType: PhotoType): Observable<CameraPhoto> {
    const uploadSettings = this.photoUploadService.photoUploadSettings;
    /// set session state to allow user to return from camera without logging in again, this would disrupt the data transfer
    this.sessionFacadeService.navigatedToPlugin = true;
    return from(
      Camera.getPhoto({
        quality: 85, //Test
        correctOrientation: true,
        allowEditing: false,
        width: uploadSettings.saveWidth ? uploadSettings.saveWidth : null,
        height: uploadSettings.saveHeight ? uploadSettings.saveHeight : null,
        direction: photoType === PhotoType.PROFILE ? CameraDirection.Front : CameraDirection.Rear,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        presentationStyle: 'popover',
        saveToGallery: false,
      })
    );
  }

  deletePendingProfileImage() {
    this.photoUploadService.presentDeletePhotoModal(this.localPhotoData.profilePending.id);
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
    });
    toast.present();
  }

  private async photoDataFetchErrorToast() {
    const toast = await this.toastController.create({
      message: 'There was an issue retrieving your photo information - please try again',
      duration: 5000,
      position: 'top',
      buttons: [
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
    toast.present();
  }

  navigateBack() {
    this.router.navigate([PATRON_NAVIGATION.settings], { replaceUrl: true });
  }
}
