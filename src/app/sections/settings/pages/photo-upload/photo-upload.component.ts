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
  selfie: SafeResourceUrl = null;
  selfiePhotoInfo: UserPhotoInfo;
  selfieBase64: string;
  frontIdSubmitted: boolean = false;
  backIdSubmitted: boolean = false;
  selfieSubmitted: boolean = false;
  userId: any;
  photoList: any;
  userPhoto: string;
  photos: any;

  constructor(
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly domsanitizer: DomSanitizer,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly toastController: ToastController,
    private readonly userFacadeService: UserFacadeService
  ) { }

  ngOnInit() {
    //call institution settings for photos 
    //keeps throwing an error
    // this.setUserPhoto();
    this.getPhotoList();
  }

  //sets the user photo varibale if there is a photo, keep getting a timeout error when i try to use this
  // private setUserPhoto() {
  //   this.userFacadeService
  //     .getAcceptedPhoto$()
  //     .pipe(
  //       map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
  //       take(1)
  //     )
  //     .subscribe(
  //       url => {
  //         this.selfie = url;
  //         console.log('userPhoto', this.selfie);
  //       },
  //       error => console.log('get User Photo error', error),
  //       () => {
  //         console.log('get User Photo Complete')
  //       }
  //     );
  // }

  //gets the photolist by user id, gives you a list of photoId but no photo base64 string
  getPhotoList() {
    this.userFacadeService.getPhotoList().subscribe(
      list => {
        console.log('getPhotoList next', list);
        this.photoList = list;
      },
      error => console.log('getPhotoList error', error),
      () => {
        console.log('getPhotoList complete')
        this.sortPhotos();
      }
    );
  }

  //sorts through the available photos and sets them appropriately, right now we dont know the format of the photo being returned so it is set to jpeg
  sortPhotos() {
    var index;
    for (index = 0; index < this.photoList.length; index++) {
      if (this.photoList[index].type === 0 && this.photoList[index].status === 1 && this.photoList[index].data !== null) {
        console.log('photo has a type of 0', this.photoList[index]);
        this.selfiePhotoInfo = this.photoList[index];
        this.selfieBase64 = this.selfiePhotoInfo.data;
        this.selfie = this.domsanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${this.selfiePhotoInfo.data}`);
      }
      if (this.photoList[index].type === 1 && this.photoList[index].status === 1 && this.photoList[index].data !== null) {
        console.log('photo has a type of 1', this.photoList[index]);
        this.frontIdPhotoInfo = this.photoList[index];
        this.frontIdBase64 = this.frontIdPhotoInfo.data;
        this.frontId = this.domsanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${this.frontIdPhotoInfo.data}`);
      }
      if (this.photoList[index].type === 2 && this.photoList[index].status === 1 && this.photoList[index].data !== null) {
        console.log('photo has a type of 2', this.photoList[index]);
        this.backIdPhotoInfo = this.photoList[index];
        this.backIdBase64 = this.backIdPhotoInfo.data;
        this.backId = this.domsanitizer.bypassSecurityTrustResourceUrl(`data:image/jpeg;base64, ${this.backIdPhotoInfo.data}`);
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
        this.selfie = this.domsanitizer.bypassSecurityTrustResourceUrl(
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
      }
    );
  }

  //will submit all photos that have been uploaded
  // this needs to be changed...i think it can add photos of each type just need to create the entire userPhotoInfo object for each
  submitPhotos() {
    console.log('front id pic', this.frontId, 'back id pic', this.backId, 'selfie pic', this.selfie);
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    //formats the selfie photo for submission
    let selfiePhotoInfo: UserPhotoInfo = {
      'externalId': null,
      'userId': '',
      'mimeType': 'image/jpeg',
      'status': 0,
      'statusReason': null,
      'data': this.frontIdBase64,
      'id': null,
      'insertTime': dateTime,
      'lastUpdated': dateTime,
      'version': 1,
      'type': 0,
    }
    this.selfiePicSubmit(selfiePhotoInfo);

    //formats the frontId pic for submission
    let frontIdPhotoInfo: UserPhotoInfo = {
      'externalId': null,
      'userId': '',
      'mimeType': 'image/jpeg',
      'status': 0,
      'statusReason': null,
      'data': this.frontIdBase64,
      'id': null,
      'insertTime': dateTime,
      'lastUpdated': dateTime,
      'version': 1,
      'type': 1,
    }
    this.frontIDPicSubmit(frontIdPhotoInfo);


    //formats the backId photo for submission
    let backIdPhotoInfo: UserPhotoInfo = {
      'externalId': null,
      'userId': '',
      'mimeType': 'image/jpeg',
      'status': 0,
      'statusReason': null,
      'data': this.frontIdBase64,
      'id': null,
      'insertTime': dateTime,
      'lastUpdated': dateTime,
      'version': 1,
      'type': 2,
    }
    this.backIDPicSubmit(backIdPhotoInfo);
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
    this.presentModal(this.selfiePhotoInfo.id);
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
      component: DeleteModalComponent,
      componentProps: {
        'photoId': photoId,
      }
    });
    await modal.onWillDismiss()
      .then((data) => {
        console.log(data);
      });;

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
