import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { QuestionBase, QuestionBaseOptionValue } from './types/question-base';
import { QuestionHeader } from './questions.model';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RequestedRoommate } from '../applications/applications.model';
import { TermsService } from '@sections/housing/terms/terms.service';
import { Observable, Subscription, from, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActionSheetController } from '@ionic/angular';
import { CameraDirection, CameraPhoto, CameraResultType, CameraSource, Plugins } from '@capacitor/core';

import { SessionFacadeService } from '../../../core/facades/session/session.facade.service';
import { ToastService } from '../../../core/service/toast/toast.service';
import { WorkOrderStateService } from '../work-orders/work-order-state.service';
import { Response } from '../housing.model';

const { Camera } = Plugins;
@Component({
  selector: 'st-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit, OnDestroy {
  constructor(private _changeDetector: ChangeDetectorRef,
    public _applicationsStateService: ApplicationsStateService,//TODO: delete
    private _termService: TermsService,
    private readonly actionSheetCtrl: ActionSheetController,
    private readonly sessionFacadeService: SessionFacadeService,
    private readonly toastService: ToastService,
    private readonly _workOrderStateService: WorkOrderStateService,
    ) {}
  
  ngOnDestroy(): void {
    this._applicationsStateService.setRequestedRoommates([])
    this._applicationsStateService.setRoommatesPreferences([])
    this._applicationsStateService.emptyRequestedRoommate()
    this._applicationsStateService.deleteRoommatePreferencesSelecteds();
    this._workOrderStateService.destroyWorkOrderImage();
    this.subscriptions.unsubscribe();
  }


  ngOnInit(): void {
    this.roommateSearchOptions$ = this._applicationsStateService.roommateSearchOptions;
    this._initTermsSubscription();
    this._initGetImage();
  }

  @Input() question: QuestionBase;

  @Input() name: string;

  @Input() parentGroup: FormGroup;

  @Input() isSubmitted: boolean;

  public image$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  requestedRoommates$: Observable<RequestedRoommate[]>;
  roommateSearchOptions$: any;
  private selectedTermKey: number = 0;
  private subscriptions: Subscription = new Subscription();

  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  errorMessages: any = {
    required: 'This field is required',
    numeric: 'This field should be numeric',
    integer: 'This field should be integer',
    string: 'This field should be string',
  };

  date = new Date();

  createHeader(question: QuestionHeader): string {
    const headerWeight: number = parseInt(question.subtype, 10);
    const headerCssClass: string =
      headerWeight > 1 ? 'question__secondary-header ion-text-uppercase' : 'question__primary-header';

    return `<${question.subtype} class="${headerCssClass}">${question.label}</${question.subtype}>`;
  }

  check(): void {
    this._changeDetector.markForCheck();
  }

  touch(): void {
    const controls: { [key: string]: AbstractControl } = this.parentGroup.controls;

    Object.keys(controls).forEach((controlName: string) => {
      controls[controlName].markAsTouched();
      controls[controlName].markAsDirty();
    });

    this.check();
  }

  trackByLabel(_: number, option: QuestionBaseOptionValue): string {
    return option.label;
  }

  private _initTermsSubscription() {
    this.subscriptions.add(this._termService.termId$.subscribe(termId => this.selectedTermKey = termId));
  }

  private _initGetImage() {
    this.subscriptions.add(this._workOrderStateService.workOrderImage$.subscribe(res => { 
      if(res!=null && res.contents != '' ){
        let format=res.filename.split('.')[1]
        this.image$.next(`data:image/${format};base64,${res.contents}`)
      } else {
        this.image$.next(null)
      }
    }));
  }

  async presentPhotoTypeSelection() {
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
    this.onGetPhoto(cameraSource);
  }
  onGetPhoto(cameraSource: CameraSource) {
    this.getPhoto(cameraSource)
      .pipe(take(1))
      .subscribe(
        response => {
          //IMAGEBASE64
          this.image$.next(response.dataUrl)
          const photoBase64 = response.dataUrl.split(',')[1];
          this.sessionFacadeService.navigatedToPlugin = true;
          this._workOrderStateService.setWorkOrderImage({
            comments:"",
            contents:photoBase64,
            filename:"work-order"+Date.now()+-''+'.'+response.format,
            studentSubmitted:true
          })
        },
        error => {
          this.presentToast('There was an issue with the picture. Please, try again.');
        },
        () => {}
      );
  }

    /// Camera plugin control
    private getPhoto(cameraSource: CameraSource): Observable<CameraPhoto> {
      // const uploadSettings = this.photoUploadService.photoUploadSettings;
      /// set session state to allow user to return from camera without logging in again, this would disrupt the data transfer
      this.sessionFacadeService.navigatedToPlugin = true;
      return from(
        Camera.getPhoto({
          quality: 100,
          correctOrientation: true,
          preserveAspectRatio: true,

          direction: CameraDirection.Rear,
          resultType: CameraResultType.DataUrl,
          source: cameraSource,
          saveToGallery: false,
        })
      );
    }
    private async presentToast(message: string) {
      await this.toastService.showToast({ message, duration: 5000 });
    }

    isWorkOrderDescription(question){
      return question.source === "WORK_ORDER" && question.workOrderFieldKey === 'DESCRIPTION';
    }
}
