import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InstitutionFacadeService } from '@core/facades/institution/institution.facade.service';
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
  newRecepientForm: FormGroup;

  newRecepientFormRef = {
    firstName: {
      fieldName: 'firstName',
      control: new FormControl('', Validators.required),
    },
    lastName: {
      fieldName: 'lastName',
      control: new FormControl('', Validators.required),
    },
    id: {
      fieldName: 'id',
      control: new FormControl('', Validators.required),
    },
    nickname: {
      fieldName: 'nickname',
      control: new FormControl('', Validators.required),
    },
  };
  saveNewRecipient: boolean;
  recipients: Recipient[] = [];
  selectedRecipient: Recipient;
  someoneElseRecipient: Recipient = {
    id: '-1',
    firstName: 'Someone',
    lastName: 'else',
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
      [this.newRecepientFormRef.firstName.fieldName]: this.newRecepientFormRef.firstName.control,
      [this.newRecepientFormRef.lastName.fieldName]: this.newRecepientFormRef.lastName.control,
      [this.newRecepientFormRef.id.fieldName]: this.newRecepientFormRef.id.control,
      [this.newRecepientFormRef.nickname.fieldName]: this.newRecepientFormRef.nickname.control,
    });
    this.institutionFacadeService.retrieveAnonymousDepositFields().then();
    this.guestDepositsService.getRecipientList().then(rec => {
      this.recipients = rec;
      if (rec.length === 0) {
        this.selectedRecipient = this.someoneElseRecipient;
      }
    });
  }

  async continue() {
    if (this.selectedRecipient === this.someoneElseRecipient && this.saveNewRecipient) {
      this.loadingService.showSpinner();
      const saved = await this.guestDepositsService.saveRecipientList(
        [...this.recipients, { ...this.newRecepientForm.value, id: new Date().getMilliseconds() }]
      );
      if (saved) {
        this.recipients.push(this.newRecepientForm.value);
        this.newRecepientForm.patchValue({});
        this.selectedRecipient = this.recipients[this.recipients.length - 1];
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
          handler: blah => {},
        },
        {
          text: 'Yes, remove',
          handler: async () => {
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

              this.selectedRecipient = this.recipients[this.recipients.length - 1];
              this.newRecepientForm.patchValue({});
            }
            this.loadingService.closeSpinner();
          },
        },
      ],
    });

    await alert.present();
  }
}
