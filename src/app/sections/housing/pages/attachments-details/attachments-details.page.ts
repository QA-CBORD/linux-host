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
} from '@ionic/angular';

import {
  Observable,
  Subscription,
} from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { QuestionComponent } from '@sections/housing/questions/question.component';
import { QuestionsPage } from '@sections/housing/questions/questions.model';
import { StepperComponent } from '@sections/housing/stepper/stepper.component';
import { TermsService } from '@sections/housing/terms/terms.service';
import { isMobile } from '@core/utils/platform-helper';
import { AttachmentTypes, AttachmentsDetail, AttachmentsList } from '../../attachments/attachments.model';
import { AttachmentsService } from '../../attachments/attachments.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';
import { PATRON_NAVIGATION } from 'src/app/app.global';

import { Chooser, ChooserResult } from '@awesome-cordova-plugins/chooser/ngx';
import { IdentityFacadeService } from '../../../../core/facades/identity/identity.facade.service';
import { AttachmentStateService } from '@sections/housing/attachments/attachments-state.service';
import { HousingService } from '@sections/housing/housing.service';
import { ToastService } from '@core/service/toast/toast.service';

const BYTES_TO_MB = 1048576;
@Component({
  selector: 'attachments-details',
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

  selectedAssetKey: number;
  selectedAssetName: string;
  selectedTermKey: number;
  notes: string;
  isSubmitted = false;
  public file$: BehaviorSubject<ChooserResult> = new BehaviorSubject<ChooserResult>(null);
  file?: ChooserResult;
  isFile: boolean;
  public fileSizeInMB: string;
  attachmentKey?: number;
  public attachmentSelected: AttachmentsList;
  public fileBase64: string;
  attachmentUrl: string;
  public fileData: File;
  constructor(
    private _platform: Platform,
    private _loadingService: LoadingService,
    private _attachmentService: AttachmentsService,
    private _attachmentStateService: AttachmentStateService,
    private route: Router,
    private _termService: TermsService,
    private chooser: Chooser,
    private identityFacadeService: IdentityFacadeService,
    private _route: ActivatedRoute,
    private _alertController: AlertController,
    private _housingService: HousingService,
    private _toastService: ToastService,
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
    this.getAttachmentUrl();
    this.attachmentKey = parseInt(this._route.snapshot.paramMap.get('attachmentKey'), 10);
    if (!this.attachmentKey) {
      this._initTermsSubscription();
      this.getAttachmentType();
    } else {
      this.attachmentSelected = this._attachmentStateService.findAttachment(this.attachmentKey);
      this._attachmentService.getAttachmentFile(this.attachmentSelected.attachmentKey).subscribe(res => this.fileBase64 = res)
    }

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

  getAttachmentUrl() {
    this._loadingService.showSpinner();
    this._attachmentService.getUrlAttachmentFile().subscribe((res) => {
      this._loadingService.closeSpinner();
      this.attachmentUrl = res;
    });
  }

  async backClicked() {
    await this.route.navigate([PATRON_NAVIGATION.housing, LOCAL_ROUTING.dashboard]);
  }

  public async submitAttachmentForm() {

    const attachmentDetailsData: AttachmentsDetail = {
      attachmentUrl: this.attachmentUrl,
      attachmentTypeKey: this._attachmentStateService.attachmentTypes.value.find(type => type.name == this.selectedAssetName).typeKey,
      notes: this.notes,
      termKey: this.selectedTermKey
    }

    const formData = new FormData();
    formData.append('file', this.fileData, this.fileData.name);
    
    this._attachmentService.sendAttachmentImage(formData, this.attachmentUrl).subscribe();
    this._attachmentService.sendAttachmentData(attachmentDetailsData).subscribe(res => {
      if (res) {
        this.route.navigate([PATRON_NAVIGATION.housing, LOCAL_ROUTING.dashboard])
      }
    })
  }

  selectFile() {
    this.identityFacadeService.updateVaultTimeout({ extendTimeout: true, keepTimeoutExtendedOnResume: true });
    this.chooser.getFile()
      .then(file => {
        this.file$.next(file);
        this.fileData = new File([new Uint8Array(file.data.buffer, file.data.byteOffset, file.data.length)], file.name, { type: file.mediaType })
        this.getSizeFile(file.data.byteLength);
      }).finally(()=> this.identityFacadeService.updateVaultTimeout({ extendTimeout: false }))
  }

  getSizeFile(fileDataInt8) {
    this.fileSizeInMB = (fileDataInt8.length / BYTES_TO_MB).toFixed(2);
  }

  async deleteAttachment() {
    const alert = await this._alertController.create({
      header: 'Delete Attachment',
      message: `Deleting this attachment will remove the Attachment Note and attached file.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => {
            this.activeAlerts = [];
            alert.dismiss();
          },
        },
        {
          text: 'Delete',
          role: 'confirm',
          cssClass: 'button__option_confirm',
          handler: () => {
            this._loadingService.showSpinner();
            this.activeAlerts = [];
            const attachmentSubscription = this._attachmentService
              .deleteAttachmentFile(this.attachmentKey)
              .subscribe(status => {
                alert.dismiss().then(() => {
                  if (status) {
                    this._housingService.handleSuccess();
                  } else {
                    this._loadingService.closeSpinner();
                    this._toastService.showToast({
                      message: 'The deleted attachement could not be processed at this time. Try again later',
                    });
                  }
                });
              });

            this.subscriptions.add(attachmentSubscription);
          },
        },
      ],
    });
    this.activeAlerts.push(alert);
    await alert.present();
  }
}
