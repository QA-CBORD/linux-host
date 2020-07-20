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
  backId: SafeResourceUrl = null;
  selfie: SafeResourceUrl = null;
  //this will change according to if the have photos or not from DB api call
  submitted: boolean = false;
  userPhoto: string;

  constructor(
    private readonly router: Router,
    private readonly modalController: ModalController,
    private readonly domsanitizer: DomSanitizer,
    private readonly identityFacadeService: IdentityFacadeService,
    private readonly toastController: ToastController,
    private readonly userFacadeService: UserFacadeService,
  ) { }

  ngOnInit() {
    //call institution settings for photos 
    this.setUserPhoto();
  }

  private setUserPhoto() {
    this.userFacadeService
      .getAcceptedPhoto$()
      .pipe(
        map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
        take(1)
      )
      .subscribe((url: string) => {
        this.userPhoto = url;
      });
      console.log('user photo', this.userPhoto);
  }

  private setIDPhotos(){

  }


  //prompts to open camera or photos for front id pic
  async promptFrontPhoto() {
    this.getPhoto().subscribe(
      data => {
        console.log('PFC Data:', data);
        this.frontId = this.domsanitizer.bypassSecurityTrustResourceUrl(`data:image/${data.format};base64, ${data.base64String}`);
      },
      error => {
        console.log('PFC Error:', error);
        this.presentToast('There was an issue taking the picture - please try again')
      },
      () => {
        console.log('PFC Complete')
      }
    )

    //OLD function for getting front ID pic , can remove
    // const image = await Camera.getPhoto({
    //   quality: 85, //Test
    //   correctOrientation: true,
    //   allowEditing: false,
    //   resultType: CameraResultType.Uri,
    //   height: 80, //Test
    //   width: 132, //Test
    // });
    // console.log('camera result', image);
    // //sanitizes image show it can be shown, i can also get the base64 by adding the result type as an array
    // var imageUrl = this.domsanitizer.bypassSecurityTrustResourceUrl(image && image.webPath);
    // console.log('img', imageUrl);
    // this.frontId = imageUrl;
  }

  //prompts to open camera or photos for front id pic
  async promptBackPhoto() {
    this.getPhoto().subscribe(
      data => {
        console.log('PBC Data:', data);
        this.backId = this.domsanitizer.bypassSecurityTrustResourceUrl(`data:image/${data.format};base64, ${data.base64String}`);
      },
      error => {
        console.log('PBC Error:', error);
        this.presentToast('There was an issue taking the picture - please try again')
      },
      () => {
        console.log('PBC Complete')
      }
    )

    //OLD Function for getting back id pic, left it here just in case, can remove
    //   const image = await Camera.getPhoto({
    //     quality: 85, //Test
    //     correctOrientation: true,
    //     allowEditing: false,
    //     resultType: CameraResultType.Uri,
    //     height: 80, //Test
    //     width: 132, //Test
    //   });
    //   console.log('camera result', image);
    //   //sanitizes image show it can be shown, i can also get the base64 by adding the result type as an array above
    //   var imageUrl = this.domsanitizer.bypassSecurityTrustResourceUrl(image && image.webPath);
    //   console.log('img', imageUrl);
    //   this.backId = imageUrl;
    // }
  }


  //prompts to open camera or photos for selfie pic
  async promptSelfieCamera() {
    this.getPhoto().subscribe(
      data => {
        console.log('PSC Data:', data);
        this.selfie = this.domsanitizer.bypassSecurityTrustResourceUrl(`data:image/${data.format};base64, ${data.base64String}`);
      },
      error => {
        console.log('PSC Error:', error);
        this.presentToast('There was an issue taking the picture - please try again')
      },
      () => {
        console.log('PSC Complete:');
      }
    );
  }

  //will submit all photos that have been uploaded
  submitPhotos() {
    console.log('front id pic', this.frontId, 'back id pic', this.backId, 'selfie pic', this.selfie);

      //trying to add the function for setting all the photos you have taken
      
    //changes the condition to submitted and removes the upload ability
    this.submitted = true;
    console.log('function for submitting photos to DB');
  }


  //will delete photos from DB
  deletePhoto() {
    this.presentModal();
    console.log('function for deleteing photos from DB');
  }

  /// Camera plugin control method
  private getPhoto(): Observable<CameraPhoto> {
    /// set identity state to allow user to return from camera without logging in again, this would disrupt the data transfer

    return from(
      Camera.getPhoto({
        quality: 85, //Test
        correctOrientation: true,
        allowEditing: false,
        width: 74.06,
        height: 90.4, //Test
        direction: CameraDirection.Front,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        presentationStyle: 'popover',
        saveToGallery: false,
      })
    );
  }

  //presents the delete pic modal and will eventually catch the result on dimiss when the api call is succesfull and update the screen appropriately
  async presentModal() {
    const modal = await this.modalController.create({
      component: DeleteModalComponent,
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
