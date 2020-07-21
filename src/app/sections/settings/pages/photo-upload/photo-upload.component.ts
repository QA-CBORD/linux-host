import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CameraDirection, CameraPhoto, CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PATRON_NAVIGATION } from '../../../../app.global';
import { from, Observable, of } from 'rxjs';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { switchMap, tap } from 'rxjs/operators';
import { UserPhotoInfo } from '@core/model/user';
import { PhotoStatus, PhotoType, PhotoUploadService } from '@sections/settings/services/photo-upload.service';

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

  localPhotoUploadStatus: LocalPhotoUploadStatus = {
    govIdBack: LocalPhotoStatus.NONE,
    govIdFront: LocalPhotoStatus.NONE,
    profile: LocalPhotoStatus.NONE,
    profilePending: LocalPhotoStatus.NONE,
  };


  constructor(
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly domsanitizer: DomSanitizer,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly toastController: ToastController,
    private readonly photoUploadService: PhotoUploadService
  ) {}

  ngOnInit() {
    console.log('PhotoUploadPage - onInit');
    this.initialization();

    // this.photoUploadService.profileImage$.subscribe(
    //   data => console.log('profileImage$: ', data),
    //   error => console.log('profileImage$ Error: ', error),
    //   () => console.log('profileImage$ Complete')
    // );
    // this.photoUploadService.profileImagePending$.subscribe(
    //   data => console.log('profileImagePending$: ', data),
    //   error => console.log('profileImagePending$ Error: ', error),
    //   () => console.log('profileImagePending$ Complete')
    // );
    // this.photoUploadService.govtIdFront$.subscribe(
    //   data => console.log('govtIdFront$: ', data),
    //   error => console.log('govtIdFront$ Error: ', error),
    //   () => console.log('govtIdFront$ Complete')
    // );
    // this.photoUploadService.govtIdBack$.subscribe(
    //   data => console.log('govtIdBack$: ', data),
    //   error => console.log('govtIdBack$ Error: ', error),
    //   () => console.log('govtIdBack$ Complete')
    // );
  }

  private initialization() {
    this.govIdFront$ = this.photoUploadService.govtIdFront$.pipe(
      tap(photoInfo => {
        this.localPhotoUploadStatus.govIdFront = this.getLocalPhotoStatus(photoInfo);
      }),
      switchMap(photoInfo => this.handlePhotoResponse(photoInfo))
    );
    this.govIdBack$ = this.photoUploadService.govtIdBack$.pipe(
      tap(photoInfo => {
        this.localPhotoUploadStatus.govIdBack = this.getLocalPhotoStatus(photoInfo);
      }),
      switchMap(photoInfo => this.handlePhotoResponse(photoInfo))
    );
    this.profileImage$ = this.photoUploadService.profileImage$.pipe(
      tap(photoInfo => {
        this.localPhotoUploadStatus.profile = this.getLocalPhotoStatus(photoInfo);
      }),
      switchMap(photoInfo => this.handlePhotoResponse(photoInfo))
    );
    this.profileImagePending$ = this.photoUploadService.profileImagePending$.pipe(
      tap(photoInfo => {
        this.localPhotoUploadStatus.profilePending = this.getLocalPhotoStatus(photoInfo);
      }),
      switchMap(photoInfo => this.handlePhotoResponse(photoInfo))
    );
  }

  private getLocalPhotoStatus(photoInfo: UserPhotoInfo): LocalPhotoStatus {
    if (photoInfo === null) {
      return LocalPhotoStatus.NONE;
    }

    if (photoInfo.status === null) {
      return LocalPhotoStatus.NEW;
    }

    switch (photoInfo.status) {
      case PhotoStatus.PENDING:
        return LocalPhotoStatus.PENDING;
      case PhotoStatus.ACCEPTED:
        return LocalPhotoStatus.ACCEPTED;
    }
  }

  private handlePhotoResponse(photoInfo: UserPhotoInfo): Observable<SafeResourceUrl> {
    if (photoInfo === null) {
      return of(null);
    }
    return of(this.formatPhotoData(photoInfo));
  }

  private formatPhotoData({ mimeType, data }: UserPhotoInfo): SafeResourceUrl {
    return this.domsanitizer.bypassSecurityTrustResourceUrl(`data:${mimeType};base64,${data}`);
  }

  get localPhotoStatus() {
    return LocalPhotoStatus;
  }

  get photoType() {
    return PhotoType;
  }

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

  deletePendingProfileImage() {}

  get submitButtonDisabled(): boolean {
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
    console.log('submitButtonDisabled - called');
    return (
      ((this.localPhotoUploadStatus.govIdFront === LocalPhotoStatus.NEW &&
        this.localPhotoUploadStatus.govIdBack === LocalPhotoStatus.ACCEPTED) ||
        (this.localPhotoUploadStatus.govIdFront === LocalPhotoStatus.ACCEPTED &&
          this.localPhotoUploadStatus.govIdBack === LocalPhotoStatus.NEW) ||
        (this.localPhotoUploadStatus.govIdFront === LocalPhotoStatus.NEW &&
          this.localPhotoUploadStatus.govIdBack === LocalPhotoStatus.NEW)) &&

      (this.localPhotoUploadStatus.profile === LocalPhotoStatus.ACCEPTED ||
        (this.localPhotoUploadStatus.profile === LocalPhotoStatus.NONE && this.localPhotoUploadStatus.profilePending === LocalPhotoStatus.NEW))
    );
  }

  //will submit all photos that have been uploaded
  submitPhotos() {
    console.log('Submit Photos');
  }

  /// Camera plugin control method
  private getPhoto(photoType: PhotoType): Observable<CameraPhoto> {
    const uploadSettings = this.photoUploadService.photoUploadSettings;
    /// set identity state to allow user to return from camera without logging in again, this would disrupt the data transfer
    this.identityFacadeService.navigateToNativePlugin = true;
    return from(
      Camera.getPhoto({
        quality: 85, //Test
        correctOrientation: true,
        allowEditing: false,
        width: uploadSettings.saveWidth ? uploadSettings.saveWidth : null,
        height: uploadSettings.saveHeight ? uploadSettings.saveHeight : null,
        direction: photoType === PhotoType.PROFILE ? CameraDirection.Front : CameraDirection.Rear,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
        presentationStyle: 'popover',
        saveToGallery: false,
      })
    );
  }

  //presents the delete pic modal and will eventually catch the result on dimiss when the api call is succesfull and update the screen appropriately
  async presentModal(photoId) {
    const modal = await this.modalController.create({
      component: DeleteModalComponent,
    });
    modal.onDidDismiss().then(data => {
      // if (data.data === true) {
      //   // console.log('data', data);
      //   //delete picture logic
      //   this.userFacadeService.updateUserPhotoStatus(photoId, 4, 'Patron deleted photo').subscribe(
      //     response => {
      //       // console.log('response from delete photo', response);
      //     },
      //     error => {
      //       console.log('error', error);
      //       this.presentToast('There was an error deleting the photo - please try again');
      //     },
      //     () => {
      //       console.log('Delete photo complete');
      //     }
      //   );
      // }
    });

    return await modal.present();
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
    });
    toast.present();
  }

  navigateBack() {
    this.router.navigate([PATRON_NAVIGATION.settings]);
  }
}
