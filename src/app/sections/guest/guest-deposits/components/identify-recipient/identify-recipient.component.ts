import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { LookupFieldInfo } from '@core/model/institution/institution-lookup-field.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController } from '@ionic/angular';
import { Recipient } from '@sections/guest/model/recipient.model';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';
import { GUEST_ROUTES } from '@sections/section.config';
import { ContentStringCategory } from '@shared/model/content-strings/content-strings-api';
import { CommonService } from '@shared/services/common.service';
import { StInputFloatingLabelComponent } from '@shared/ui-components/st-input-floating-label';
import { ROLES } from 'src/app/app.global';
import { IdentifyRecipientCsModel } from './identity-recipient.content.string';

@Component({
  selector: 'st-identify-recipient',
  templateUrl: './identify-recipient.component.html',
  styleUrls: ['./identify-recipient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentifyRecipientComponent implements OnInit {
  @ViewChildren('newRecipientField') newRecipientFieldsRef: QueryList<StInputFloatingLabelComponent>;

  readonly newRecipientFormName = 'newRecipient';
  newRecepientForm: FormGroup;
  isLoading: boolean;
  contentString: IdentifyRecipientCsModel;
  newRecepientFormRef: { fieldName: string; control: FormControl; lookupField?: LookupFieldInfo }[] = [
    { fieldName: 'Nickname', control: new FormControl('', Validators.required) },
  ];
  saveNewRecipient: boolean;
  recipients: Recipient[] = [];
  selectedRecipient: Recipient;
  someoneElseRecipient: Recipient = {
    id: '-1',
    nickname: 'Add another recipient',
  };

  get newRecipientFields() {
    return this.newRecepientForm.controls[this.newRecipientFormName] as FormArray;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly guestDepositsService: GuestDepositsService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly alertController: AlertController,
    private readonly loadingService: LoadingService,
    private readonly router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly commonService: CommonService
  ) {
    this.newRecepientForm = this.fb.group({
      [this.newRecipientFormName]: this.fb.array(this.newRecepientFormRef.map(f => f.control)),
    });

    this.institutionFacadeService
      .retrieveAnonymousDepositFields()
      .toPromise()
      .then(fields => this.generateFormFields(fields, this.newRecipientFields))
      .finally(() => this.cdRef.detectChanges());
  }

  ngOnInit() {
    this.initComponentData();
  }

  initComponentData(): void {
    this.activatedRoute.data.subscribe(({ data: { recipients } }) => {
      this.recipients = recipients;
      if (recipients && recipients.length === 0) {
        this.selectedRecipient = this.someoneElseRecipient;
      }
    });
    this.contentString = this.commonService.getString(ContentStringCategory.identifyRecipient);
    this.someoneElseRecipient.nickname = this.contentString.addOtherRecipientText;
  }

  getNextField(index: number) {
    return this.newRecipientFieldsRef.toArray()[index];
  }

  async continue() {
    const errorMessage = this.contentString.addNewRecipientFailureMessage;
    if (this.selectedRecipient === this.someoneElseRecipient) {
      this.loadingService.showSpinner();

      this.guestDepositsService
        .retrieveAndSaveRecipientByCashlessFields(
          ('' + this.newRecepientFormRef[0].control.value).trim(),
          [
            ...this.newRecepientFormRef
              .filter(f => f.lookupField)
              .map(f => ({ ...f.lookupField, value: ('' + f.control.value).trim() })),
          ],
          [...this.recipients],
          this.saveNewRecipient
        )
        .then(newRecepient => {
          if (newRecepient) {
            if (this.saveNewRecipient) {
              this.recipients.push(newRecepient);
              this.selectedRecipient = newRecepient;
            }
            this.saveNewRecipient = false;
            this.resetForm(this.newRecipientFields.controls);
            this.navigateToAddFunds(newRecepient);
          } else {
            this.toastService.showError({ message: errorMessage });
          }
        })
        .catch(() => this.toastService.showError({ message: errorMessage }))
        .finally(() => {
          this.isLoading = false;
          this.loadingService.closeSpinner();
          this.cdRef.detectChanges();
        });
    } else {
      this.navigateToAddFunds(this.selectedRecipient);
    }
  }

  async presentRemoveConfirm(recipient: Recipient) {
    const { removeDialogTitle, removeDialogMessage, removeDialogCancel, removeDialogConfirm } = this.contentString;
    const alert = await this.alertController.create({
      header: `${removeDialogTitle} ${recipient.nickname}`,
      message: removeDialogMessage,
      buttons: [
        {
          text: removeDialogCancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => undefined,
        },
        {
          text: removeDialogConfirm,
          handler: () => this.removeRecipient(recipient),
        },
      ],
    });

    await alert.present();
  }

  private resetForm(controls: AbstractControl[]) {
    controls.forEach(control => {
      control.reset();
      control.setValue('');
    });
  }

  private generateFormFields(fields: LookupFieldInfo[], formArray: FormArray) {
    for (const lookUpField of fields.sort((fieldA, fieldB) => fieldA.displayOrder - fieldB.displayOrder)) {
      const field = {
        fieldName: lookUpField.displayName,
        control: new FormControl('', Validators.required),
        lookupField: lookUpField,
      };
      this.newRecepientFormRef.push(field);
      formArray.push(field.control);
    }
  }

  private async removeRecipient(recipient: Recipient) {
    this.loadingService.showSpinner();
    const updatedList = this.recipients.filter(rec => rec.id !== recipient.id);
    const saved = await this.guestDepositsService.saveRecipientList(updatedList);
    if (saved) {
      this.recipients = updatedList;
      if (this.selectedRecipient === recipient) {
        if (this.recipients.length) {
          this.selectedRecipient = this.recipients[0];
        } else {
          this.selectedRecipient = this.someoneElseRecipient;
        }
      }
    }
    this.loadingService.closeSpinner();
    this.cdRef.detectChanges();
  }

  private navigateToAddFunds(recipient: Recipient) {
    this.router.navigate([ROLES.guest, GUEST_ROUTES.addFunds], {
      queryParams: { recipientName: recipient.nickname, userId: recipient.id },
      skipLocationChange: true,
    });
  }
}
