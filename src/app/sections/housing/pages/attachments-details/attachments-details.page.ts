import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { LoadingService } from '@core/service/loading/loading.service';
import { QuestionComponent } from '@sections/housing/questions/question.component';
import { QuestionsPage } from '@sections/housing/questions/questions.model';
import { StepperComponent } from '@sections/housing/stepper/stepper.component';
import { TermsService } from '@sections/housing/terms/terms.service';

import { AttachmentTypes, AttachmentsDetail, AttachmentsList } from '../../attachments/attachments.model';
import { AttachmentsService } from '../../attachments/attachments.service';

import { Chooser, ChooserResult } from '@awesome-cordova-plugins/chooser/ngx';
import { IdentityFacadeService } from '../../../../core/facades/identity/identity.facade.service';
import { AttachmentStateService } from '@sections/housing/attachments/attachments-state.service';
import { HousingService } from '@sections/housing/housing.service';
import { ToastService } from '@core/service/toast/toast.service';

const BYTES_TO_MB = 1048576;
const SIZE_LIMIT = 10;

@Component({
  selector: 'attachments-details',
  templateUrl: './attachments-details.page.html',
  styleUrls: ['./attachments-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttachmentsDetailsPage implements OnInit, OnDestroy {
  @ViewChild(StepperComponent) stepper: StepperComponent;
  @ViewChildren(QuestionComponent) questions: QueryList<QuestionComponent>;

  private subscriptions: Subscription = new Subscription();

  pages$: Observable<QuestionsPage[]>;

  selectedAssetKey: number;
  selectedAssetName: string;
  selectedTermKey: number;
  notes: string;
  isSubmitted: boolean;
  attachmentTypes$: Observable<AttachmentTypes[]>;
  attachmentKey?: number;
  attachmentUrl: string;
  attachmentSelected: AttachmentsList;
  fileSizeInMB: number;
  fileBase64: string;
  fileData: File;
  file$: BehaviorSubject<ChooserResult> = new BehaviorSubject<ChooserResult>(null);
  file?: ChooserResult;
  isImage: boolean;

  constructor(
    private _loadingService: LoadingService,
    private _attachmentService: AttachmentsService,
    private _attachmentStateService: AttachmentStateService,
    private _termService: TermsService,
    private chooser: Chooser,
    private identityFacadeService: IdentityFacadeService,
    private _route: ActivatedRoute,
    private _alertController: AlertController,
    private _housingService: HousingService,
    private _toastService: ToastService
  ) {}

  customPopoverOptions = {
    mode: 'md',
    showBackdrop: false,
  };

  ngOnInit(): void {
    this.attachmentKey = +this._route.snapshot.params.attachmentKey;
    if (!this.attachmentKey) {
      this._initTermsSubscription();
      this.attachmentTypes$ = this.getAttachmentType();
    } else {
      this.attachmentSelected = this._attachmentStateService.findAttachment(this.attachmentKey);
      this.getAttachmentFile();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getAttachmentType() {
    this._loadingService.showSpinner();
    return this._attachmentService.getAttachmentTypes().pipe(
      tap(type => {
        this._attachmentStateService.setAttachmentTypes(type);
        this._loadingService.closeSpinner();
        return type;
      })
    );
  }

  getAttachmentUrl() {
    this._loadingService.showSpinner();
    this._attachmentService
      .getUrlAttachmentFile()
      .pipe(first())
      .subscribe(url => {
        this._loadingService.closeSpinner();
        if (url) {
          this.attachmentUrl = url;
        } else {
          this._toastService.showToast({
            message: 'There was a problem submitting the Form. Try again or contact the Housing office.',
          });
        }
      });
  }

  public async submitAttachmentForm() {
    const attachmentDetailsData: AttachmentsDetail = {
      attachmentUrl: this.attachmentUrl,
      attachmentTypeKey: this._attachmentStateService.attachmentTypes.value.find(
        type => type.name == this.selectedAssetName
      ).typeKey,
      notes: this.notes,
      termKey: this.selectedTermKey,
    };

    const formData = new FormData();
    formData.append('file', this.fileData, this.fileData.name);

    await this.confirmSubmission(formData, attachmentDetailsData);
  }

  selectFile() {
    this.getAttachmentUrl();
    this.identityFacadeService.updateVaultTimeout({ extendTimeout: true, keepTimeoutExtendedOnResume: true });
    this.chooser
      .getFile()
      .then(file => {
        this.file$.next(file);
        this.fileSizeInMB = this.getSizeFile(file.data.byteLength);
        if (this.fileSizeInMB > 0) {
          this.buildFile(file);
          this.isImage = this.getFileType(file) === 'image';
        }
        this.alertAttachmentLimitSize(this.fileSizeInMB);
      })
      .finally(() => this.identityFacadeService.updateVaultTimeout({ extendTimeout: false }));
  }

  getFileType(file: ChooserResult) {
    return file.mediaType.split('/')[0];
  }

  getSizeFile(fileDataInt8) {
    const sizeFile = Number((fileDataInt8 / BYTES_TO_MB).toFixed(2));
    return sizeFile <= SIZE_LIMIT ? sizeFile : 0;
  }

  async alertAttachmentLimitSize(fileSize: number) {
    if (!fileSize) {
      const alert = await this._alertController.create({
        cssClass: 'alert-modal-attachment',
        header: 'Large File Size',
        message: `Attachment file size cannot exceed 10 MB. Select a smaller file.`,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            cssClass: 'button__option_cancel_attachment',
            handler: () => {
              alert.dismiss();
              this.file$.next(null);
            },
          },
        ],
      });
      await alert.present();
    }
  }

  async confirmDeletion() {
    const alert = await this._alertController.create({
      cssClass: 'alert-modal-attachment',
      header: 'Delete Attachment?',
      message: `Deleting this attachment will remove the Attachment Note and attached file.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'button__option_cancel_attachment',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: 'Delete',
          role: 'confirm',
          cssClass: 'button__option_delete_attachment',
          handler: () => {
            this.deleteAttachment(alert);
          },
        },
      ],
    });
    await alert.present();
  }

  private deleteAttachment(alert: HTMLIonAlertElement) {
    this._loadingService.showSpinner();
    this._attachmentService
      .deleteAttachmentFile(this.attachmentKey)
      .pipe(first())
      .subscribe(async (status) => {
        await alert.dismiss();
        this._loadingService.closeSpinner();
        if (status) {
          this._housingService.goToDashboard();
        } else {
          this._toastService.showToast({
            message: 'The deleted attachement could not be processed at this time. Try again later',
          });
        }
      });
  }

  private async confirmSubmission(formData: FormData, attachmentDetailsData: AttachmentsDetail) {
    const alert = await this._alertController.create({
      header: 'Confirm',
      message: `Are you sure you want to submit this attachment?`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          cssClass: 'button__option_cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: 'YES',
          role: 'confirm',
          cssClass: 'button__option_confirm',
          handler: () => {
            this.uploadAttachment(formData, attachmentDetailsData, alert);
          },
        },
      ],
    });
    await alert.present();
  }

  private uploadAttachment(formData: FormData, attachmentDetailsData: AttachmentsDetail, alert: HTMLIonAlertElement) {
    this._loadingService.showSpinner();
    const createAttachmentSubscription = this._attachmentService
      .sendAttachmentImage(formData, this.attachmentUrl)
      .pipe(switchMap(() => this._attachmentService.sendAttachmentData(attachmentDetailsData)))
      .subscribe(res => {
        alert.dismiss();
        this._loadingService.closeSpinner();
        if (res) {
          this._housingService.goToDashboard();
        } else {
          this._toastService.showToast({
            message: 'There was a problem submitting the Form. Try again or contact the Housing office.',
          });
        }
      });

    this.subscriptions.add(createAttachmentSubscription);
  }

  private getAttachmentFile() {
    this.subscriptions.add(
      this._attachmentService
        .getAttachmentFile(this.attachmentSelected.attachmentKey)
        .subscribe(res => (this.fileBase64 = res))
    );
  }

  private _initTermsSubscription() {
    this.subscriptions.add(
      this._termService.termId$.subscribe(termId => {
        this.selectedTermKey = termId;
      })
    );
  }

  private buildFile(file: ChooserResult) {
    this.fileData = new File([new Uint8Array(file.data.buffer, file.data.byteOffset, file.data.length)], file.name, {
      type: file.mediaType,
    });
  }
}
