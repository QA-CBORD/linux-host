import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { LookupFieldInfo } from '@core/model/institution/institution-lookup-field.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { AlertController } from '@ionic/angular';
import { Recipient } from '@sections/guest/model/recipient.model';
import { GuestDepositsService } from '@sections/guest/services/guest-deposits.service';

@Component({
  selector: 'st-identify-recipient',
  templateUrl: './identify-recipient.component.html',
  styleUrls: ['./identify-recipient.component.scss'],
})
export class IdentifyRecipientComponent {
  readonly newRecipientFormName = 'newRecipient';
  newRecepientForm: FormGroup;

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly guestDepositsService: GuestDepositsService,
    private readonly institutionFacadeService: InstitutionFacadeService,
    private readonly alertController: AlertController,
    private readonly loadingService: LoadingService
  ) {
    this.newRecepientForm = this.fb.group({
      [this.newRecipientFormName]: this.fb.array(this.newRecepientFormRef.map(f => f.control)),
    });

    this.institutionFacadeService
      .retrieveAnonymousDepositFields()
      .toPromise()
      .then(fields => this.generateFormFields(fields, this.newRecipientFields));
    this.guestDepositsService.getRecipientList().then(rec => {
      this.recipients = rec;
      if (rec.length === 0) {
        this.selectedRecipient = this.someoneElseRecipient;
      }
    });
  }

  get newRecipientFields() {
    return this.newRecepientForm.controls[this.newRecipientFormName] as FormArray;
  }
  async continue() {
    if (this.selectedRecipient === this.someoneElseRecipient) {
      this.loadingService.showSpinner();
      const newRecepient = await this.guestDepositsService.retrieveAndSaveRecipientByCashlessFields(
        this.newRecepientFormRef[0].control.value,
        [
          ...this.newRecepientFormRef
            .filter(f => f.lookupField)
            .map(f => ({ ...f.lookupField, value: f.control.value })),
        ],
        [...this.recipients],
        this.saveNewRecipient
      );

      if (newRecepient) {
        if (this.saveNewRecipient) {
          this.recipients.push(newRecepient);
          this.selectedRecipient = this.recipients[this.recipients.length - 1];
        }
        this.saveNewRecipient = false;
        this.resetForm(this.newRecipientFields.controls);
      }
      this.loadingService.closeSpinner();
    }
  }

  async presentRemoveConfirm(recipient: Recipient) {
    const alert = await this.alertController.create({
      header: 'Remove ' + recipient.nickname,
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Oops, cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => undefined,
        },
        {
          text: 'Yes, remove',
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
    for (const lookUpField of fields) {
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
  }
}
