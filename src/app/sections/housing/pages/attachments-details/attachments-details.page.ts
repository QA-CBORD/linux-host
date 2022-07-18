import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  Platform,
  ToastController
} from '@ionic/angular';

import {
  Observable,
  Subscription,
  throwError
} from 'rxjs';
import {
  catchError,
  tap
} from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { HousingService } from '@sections/housing/housing.service';
import { AssetTypeDetailValue } from '@sections/housing/non-assignments/non-assignments.model';
import { QuestionComponent } from '@sections/housing/questions/question.component';
import { QuestionsPage } from '@sections/housing/questions/questions.model';
import { StepperComponent } from '@sections/housing/stepper/stepper.component';
import { TermsService } from '@sections/housing/terms/terms.service';
import { isMobile } from '@core/utils/platform-helper';
import { ToastService } from '@core/service/toast/toast.service';
import { FormGroup } from '@angular/forms';
import { AttachmentTypes, AttachmentsDetail, LocalFile, ImageData } from '../../attachments/attachments.model';
import { AttachmentsService } from '../../attachments/attachments.service';
import { AttachmentStateService } from '../../attachments/attachments-state.service';
import { Filesystem, Directory as FilesystemDirectory } from '@capacitor/filesystem';
import { CameraDirection, Photo, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraService } from '@sections/settings/pages/services/camera.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { SuccessAttachmentModal } from './successful-attachment-modal/successful-attachment-modal.component';
import { Router } from '@angular/router';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';
import { PATRON_NAVIGATION } from 'src/app/app.global';

import { BASE64 } from '../../../../core/utils/regexp-patterns';
import { Chooser, ChooserResult } from '@awesome-cordova-plugins/chooser/ngx';
import { NativeProvider } from '../../../../core/provider/native-provider/native.provider';
import { IdentityFacadeService } from '../../../../core/facades/identity/identity.facade.service';

const IMAGE_DIR = 'stored-images';
@Component({
  selector: 'st-work-order-details',
  templateUrl: './attachments-details.page.html',
  styleUrls: ['./attachments-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentsDetailsPage implements OnInit, OnDestroy {
  @ViewChild('content') private content: any;
  @ViewChild(StepperComponent) stepper: StepperComponent;
  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  private subscriptions: Subscription = new Subscription();
  private activeAlerts: HTMLIonAlertElement[] = [];

  attachmentTypes$: Observable<AttachmentTypes[]>;
  pages$: Observable<QuestionsPage[]>;

  workOrderKey: number;
  selectedAssetKey: number;
  selectedAssetName: string;
  selectedTermKey: number;
  notes: string;
  isSubmitted = false;
  images: LocalFile[] = [];
  public file$: BehaviorSubject<ChooserResult> = new BehaviorSubject<ChooserResult>(null);
  file?: ChooserResult;
  isFile: boolean;
  public fileSizeInMB: string;
  constructor(
    private _platform: Platform,
    private _loadingService: LoadingService,
    private _toastService: ToastService,
    private actionSheetCtrl: ActionSheetController,
    private _attachmentService: AttachmentsService,
    private _attachmentStateService: AttachmentStateService,
    private plt: Platform,
    private cameraService: CameraService,
    private readonly modalCtrl: ModalController,
    private route: Router,
    private _termService: TermsService,
    private chooser: Chooser,
    private identityFacadeService: IdentityFacadeService
  ) { }

  ngOnInit(): void {
    if (isMobile(this._platform)) {
      this.subscriptions = this._platform.pause.subscribe(() => {
        this.activeAlerts.forEach(alert => {
          alert.dismiss();
        });
        this.activeAlerts = [];
      });
    }
    this._initTermsSubscription()
    this.getAttachmentType()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _initTermsSubscription() {
    this.subscriptions.add(
      this._termService.termId$
        .subscribe(termId => {
          this.selectedTermKey = termId;
        }));

  }

  getAttachmentType() {
    this._loadingService.showSpinner();
    this.attachmentTypes$ = this._attachmentService.getAttachmentTypes().pipe(tap((res) => {
      this._attachmentStateService.setAttachmentTypes(res);
      this._loadingService.closeSpinner();
      return res;
    }));
  }

  async backClicked() {
    await this.route.navigate([PATRON_NAVIGATION.housing, LOCAL_ROUTING.dashboard]);
  }


  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: FilesystemDirectory.Data,
      path: file.path,
    });
    this.presentToast('File removed.');
  }

  private async presentToast(message: string) {
    await this._toastService.showToast({ message, duration: 5000 });
  }

  public async submitAttachmentForm() {
    const multiLevelSelectDialogComponent = await this.modalCtrl.create({
      component: SuccessAttachmentModal,
      componentProps: {
      },
    });

    let form: AttachmentsDetail = {
      attachmentFile: this.file$.value.dataURI.replace(BASE64, ''),
      attachmentTypeKey: this.selectedAssetKey,
      attachmentTypeName: this.file$.value.mediaType,
      notes: this.notes,
      fileName: this.file$.value.name,
      termKey: this.selectedTermKey
    }

    let formData = new FormData();
    formData.append('attachmentFile',form.attachmentFile)
    formData.append('attachmentTypeKey',form.attachmentTypeKey.toString())
    formData.append('attachmentTypeName',form.attachmentTypeName)
    formData.append('notes',form.notes)
    formData.append('fileName',form.fileName)
    formData.append('termKey',form.termKey.toString())

    this._attachmentService.sendAttachmentImage(formData).subscribe(res => {
      console.log(res);
      if(res){
        multiLevelSelectDialogComponent.present();
        this.identityFacadeService.updateVaultTimeout({ extendTimeout: false });
      }
    })

    // multiLevelSelectDialogComponent.present();
  }

  setSelectedAssetKey() {
    this.selectedAssetKey
  }

  selectFile() {
    this.chooser.getFile()
      .then(file => {
        this.identityFacadeService.updateVaultTimeout({ extendTimeout: true, keepTimeoutExtendedOnResume: true });
        this.file$.next(null)
        this.file$.next(file);
        this.isFile = !!file.mediaType.indexOf('image');
        this.getSizeFile(file.data);
      })
  }
  getSizeFile(fileDataInt8){
    this.fileSizeInMB = (fileDataInt8.length / 1_048_576).toFixed(2);
  }
}
