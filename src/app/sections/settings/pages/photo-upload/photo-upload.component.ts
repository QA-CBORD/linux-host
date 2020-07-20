import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//will be moved to photo upload component when i figure out routing issue
import { CameraDirection, CameraPhoto, CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PATRON_NAVIGATION } from '../../../../app.global';
import { from, Observable } from 'rxjs';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { map, take } from 'rxjs/operators';
import { UserPhotoInfo, UserPhotoList } from '@core/model/user';

const { Camera } = Plugins;

@Component({
  selector: 'st-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss'],
})
export class PhotoUploadComponent implements OnInit {
  frontId: SafeResourceUrl = null;
  frontIdPhotoInfo: UserPhotoInfo;
  frontIdBase64: string;
  backId: SafeResourceUrl = null;
  backIdPhotoInfo: UserPhotoInfo;
  backIdBase64: string;
  selfieNew: SafeResourceUrl = null;
  selfieOld: SafeResourceUrl = null;
  selfiePhotoInfo: UserPhotoInfo;
  selfieBase64: string;
  frontIdSubmitted: boolean = false;
  backIdSubmitted: boolean = false;
  selfieSubmitted: boolean = false;
  userId: string;
  photoList: any;
  userPhoto: string;
  photos: any;
  hasPendingPhotos: boolean;
  pendingPhoto: SafeResourceUrl = null;
  pendingPhotoInfo: UserPhotoInfo;

  constructor(
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly domsanitizer: DomSanitizer,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly toastController: ToastController,
    private readonly userFacadeService: UserFacadeService
  ) { }

  ngOnInit() {
    //weve got to initially determine if they having pending photos or not
    this.getPhotoList();
    //call institution settings for photos 
    //we can keep this but we can also use the sort photo function to do it
    this.setUserPhoto();

  }

  //sets the user photo varibale if there is a photo, keep getting a timeout error when i try to use this
  private setUserPhoto() {
    this.userFacadeService
      .getAcceptedPhoto$()
      .pipe(
        map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
        take(1)
      )
      .subscribe(
        url => {
          this.selfieOld = url;
          // console.log('userPhoto', this.selfieOld);
        },
        error => console.log('get User Photo error', error),
        () => {
          // console.log('get User Photo Complete')
        }
      );
  }

  //gets the photolist by user id, gives you a list of photoId but no photo base64 string
  getPhotoList() {
    this.userFacadeService.getPhotoList().subscribe(
      list => {
        // console.log('getPhotoList next', list);
        this.photoList = list.list;
      },
      error => console.log('getPhotoList error', error),
      () => {
        // console.log('getPhotoList complete', this.photoList);
        this.sortPhotos();
      }
    );
  }

  //sorts through the available photos and sets them appropriately, right now we dont know the format of the photo being returned so it is set to jpeg
  sortPhotos() {
    console.log('photo list', this.photoList);
    var index;
    for (index = 0; index < this.photoList.length; index++) {
      if (this.photoList[index].type === 0 && this.photoList[index].status === 0) {
        this.hasPendingPhotos = true;
        this.pendingPhotoInfo = this.photoList[index];

        this.userFacadeService.getPhotoById(this.photoList[index].id)
          .pipe(map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
            take(1)
          )
          .subscribe(
            url => {
              this.pendingPhoto = url;
              // console.log('front id', this.frontId)
            },
            error => console.log('get pending from db Photo error', error),
            () => {
              // console.log('get pending from db Photo Complete')
            });

        // console.log('front id if there is one', this.frontId);
        this.pendingPhoto = this.domsanitizer.bypassSecurityTrustResourceUrl(`${this.pendingPhoto}`);
        this.selfieNew = this.pendingPhoto;
      } else {
        if (this.photoList[index].type === 1 && this.photoList[index].status === 1 && this.photoList[index].data === null) {

          // console.log('photo has a type of 1', this.photoList[index]);
          this.frontIdPhotoInfo = this.photoList[index];

          this.userFacadeService.getPhotoById(this.photoList[index].id)
            .pipe(map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
              take(1)
            )
            .subscribe(
              url => {
                this.frontId = url;
                // console.log('front id', this.frontId)
              },
              error => console.log('get front id from db Photo error', error),
              () => {
                // console.log('get front id from db Photo Complete')
              });

          // console.log('front id if there is one', this.frontId);
          this.frontId = this.domsanitizer.bypassSecurityTrustResourceUrl(`${this.frontId}`);
        }
        if (this.photoList[index].type === 2 && this.photoList[index].status === 1 && this.photoList[index].data === null) {

          // console.log('photo has a type of 2', this.photoList[index]);
          this.backIdPhotoInfo = this.photoList[index];

          this.userFacadeService.getPhotoById(this.photoList[index].id)
            .pipe(map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
              take(1)
            )
            .subscribe(
              url => {
                this.backId = url;
                // console.log('back id', this.backId)
              },
              error => console.log('get back id from db Photo error', error),
              () => {
                // console.log('get back id from db Photo Complete')
              });

          this.backId = this.domsanitizer.bypassSecurityTrustResourceUrl(`${this.backId}`);
        }
      }
    }
  }


  //prompts to open camera or photos for front id pic
  async promptFrontPhoto() {
    this.getPhoto().subscribe(
      data => {
        console.log('PFC Data:', data);
        this.frontId = this.domsanitizer.bypassSecurityTrustResourceUrl(
          `data:image/${data.format};base64, ${data.base64String}`
        );
        this.frontIdBase64 = data.base64String;
      },
      error => {
        console.log('PFC Error:', error);
        this.presentToast('There was an issue taking the picture - please try again');
      },
      () => {
        console.log('PFC Complete');
      }
    );

    //   height: 80, //Test
    //   width: 132, //Test
  }

  //prompts to open camera or photos for front id pic
  async promptBackPhoto() {
    this.getPhoto().subscribe(
      data => {
        console.log('PBC Data:', data);
        this.backId = this.domsanitizer.bypassSecurityTrustResourceUrl(
          `data:image/${data.format};base64, ${data.base64String}`
        );
        this.backIdBase64 = data.base64String;
      },
      error => {
        console.log('PBC Error:', error);
        this.presentToast('There was an issue taking the picture - please try again');
      },
      () => {
        console.log('PBC Complete');
      }
    );

    //     height: 80, //Test
    //     width: 132, //Test
  }

  //prompts to open camera or photos for selfie pic
  async promptSelfieCamera() {
    this.getPhoto().subscribe(
      data => {
        console.log('PSC Data:', data);
        this.selfieNew = this.domsanitizer.bypassSecurityTrustResourceUrl(
          `data:image/${data.format};base64, ${data.base64String}`
        );
        this.selfieBase64 = data.base64String;
      },
      error => {
        console.log('PSC Error:', error);
        this.presentToast('There was an issue taking the picture - please try again');
      },
      () => {
        console.log('PSC Complete:');
        console.log('selfieNew', this.selfieNew);
      }
    );
  }

  //will submit all photos that have been uploaded
  submitPhotos() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    //formats the selfie photo for submission
    let selfiePhotoInfo: UserPhotoInfo = {
      'externalId': null,
      'userId': '',
      'mimeType': 'image/jpg',
      'status': 0,
      'statusReason': null,
      'data': this.selfieBase64,
      'id': null,
      'insertTime': null,
      'lastUpdated': null,
      'version': null,
      'type': 0,
    }
    this.selfiePicSubmit(selfiePhotoInfo);

    //formats the frontId pic for submission
    let frontIdPhotoInfo: UserPhotoInfo = {
      'externalId': null,
      'userId': '',
      'mimeType': 'image/jpg',
      'status': 0,
      'statusReason': null,
      'data': this.frontIdBase64,
      'id': null,
      'insertTime': null,
      'lastUpdated': null,
      'version': null,
      'type': 1,
    }
    this.frontIDPicSubmit(frontIdPhotoInfo);


    //formats the backId photo for submission
    let backIdPhotoInfo: UserPhotoInfo = {
      'externalId': null,
      'userId': '',
      'mimeType': 'image/jpg',
      'status': 0,
      'statusReason': null,
      'data': this.backIdBase64,
      'id': null,
      'insertTime': null,
      'lastUpdated': null,
      'version': null,
      'type': 2,
    }
    this.backIDPicSubmit(backIdPhotoInfo);

    this.ngOnInit();
  }


  selfiePicSubmit(photo: UserPhotoInfo) {
    //this is where the add user photo code will go for selfie
    this.userFacadeService.addUserPhoto(photo)
      .subscribe(
        response => {
          console.log('response from selfie upload', response);
        },
        error => {
          console.log('selfie photo submit error', error);
          this.presentToast('There was an issue submitting the photo - please try again');
        },
        () => {
          this.selfieSubmitted = true;
          console.log('selfie Photo submitted');
        }
      )
  }

  frontIDPicSubmit(photo: UserPhotoInfo) {
    //this is where the add user photo code will go for selfie
    this.userFacadeService.addUserPhoto(photo)
      .subscribe(
        response => {
          console.log('response from front id upload', response);
        },
        error => {
          console.log('front id photo submit error', error);
          this.presentToast('There was an issue submitting the photo - please try again');
        },
        () => {
          this.frontIdSubmitted = true
          console.log('front id Photo submitted');
        }
      )

  }

  backIDPicSubmit(photo: UserPhotoInfo) {
    //this is where the add user photo code will go for selfie
    this.userFacadeService.addUserPhoto(photo)
      .subscribe(
        response => {
          console.log('response from back id upload', response);
        },
        error => {
          console.log('back id photo submit error', error);
          this.presentToast('There was an issue submitting the photo - please try again');
        },
        () => {
          this.backIdSubmitted = true;
          console.log('back id Photo submitted');
        }
      )
  }

  //opens modal for delete confirmation
  deletePhoto() {
    //passes in the photoId of the image being deleted, so far i am just asking them to delete the selfie, since that is what the design displayed
    this.presentModal(this.pendingPhotoInfo.id);
  }

  /// Camera plugin control method
  private getPhoto(): Observable<CameraPhoto> {
    /// set identity state to allow user to return from camera without logging in again, this would disrupt the data transfer
    this.identityFacadeService.navigateToNativePlugin = true;
    return from(
      Camera.getPhoto({
        quality: 85, //Test
        correctOrientation: true,
        allowEditing: false,
        width: 74.06,
        height: 90.4, //Test
        direction: CameraDirection.Front,
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
      component: DeleteModalComponent
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data.data === true) {
          // console.log('data', data);
          this.hasPendingPhotos = false;

          //delete picture logic
          this.userFacadeService.updateUserPhotoStatus(photoId, 5, 'Patron deleted photo')
            .subscribe(
              response => {
                console.log('response from delete photo', response);
              },
              error => {
                this.presentToast('There was an error deleting the photo - please try again');
              },
              () => {
                console.log('Delete photo complete');
              }
            )
        }
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
