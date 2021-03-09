import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { InputValidator } from 'src/app/password-validation/models/input-validator.model';
import { Field, formField, STATICFIELDS } from '../../models/registration-utils';
import { RegistrationServiceFacade } from '../../services/registration-service-facade';
import { RegistrationSuccessComponent } from '../registration-success/registration-success.component';

@Component({
  selector: 'st-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  horizontalFields: formField[] = [];
  formFields: Field[] = [];
  registrationFormGroup: FormGroup;
  title$: Observable<string>;
  btnText$: Observable<string>;
  passwordValidators: InputValidator[] = [];
  allFields: Field[] = [];

  protected customLoadingOptions = { message: 'Processing... Please wait', duration: 150000 };

  constructor(
    private readonly registrationFacade: RegistrationServiceFacade,
    private readonly fb: FormBuilder,
    private readonly loadingService: LoadingService,
    private readonly modalCtrl: ModalController,
    private readonly toastService: ToastService
  ) {}

  async ngOnInit() {
    await this.formFieldsetup();
    const { formData } = await this.registrationFacade.getData();
    this.title$ = of(formData.title);
    this.btnText$ = of(formData.submitBtnTxt);
    this.passwordValidators = formData.passwordValidators;
  }

  private async formFieldsetup(): Promise<void> {
    const { fieldList: formFieldList } = await this.registrationFacade.getData();
    const fields = [...formFieldList.horizontalAlignedFields, ...formFieldList.verticalAlignedFields];
    this.allFields = fields;
    this.registrationFormGroup = this.fb.group(formFieldList.controls);
    fields.forEach(field => {
      field.control = this.registrationFormGroup.get(field.name);
      if (field.name != STATICFIELDS.password) {
        field.control.valueChanges.subscribe(value => {
          field.touched = true;
          field.value = value;
          field.validate();
        });
      }
    });
    this.horizontalFields = formFieldList.horizontalAlignedFields;
    this.formFields = formFieldList.verticalAlignedFields;
  }

  get firstNameField(): formField {
    const { firstName } = STATICFIELDS;
    return this.horizontalFields.find(({ idd: fieldName }) => fieldName == firstName.idd);
  }

  get lastNameField(): formField {
    const { lastName } = STATICFIELDS;
    return this.horizontalFields.find(({ idd: fieldName }) => fieldName == lastName.idd);
  }

  get passwordField(): Field {
    return this.formFields.find(({ name: fieldName }) => fieldName == STATICFIELDS.password);
  }

  get disabled(): boolean {
    if (this.registrationFormGroup.touched == false) return true;
    for (let i = 0; i < this.allFields.length; i++) {
      if (this.allFields[i].hasError || !this.allFields[i].touched) return true;
    }
    return false;
  }

  onDecline() {
    this.modalCtrl.dismiss(false);
  }

  private get formInvalid(): boolean {
    let errorCounter = 0;
    this.allFields.forEach(field => {
      field.hasError = field.hasError || !field.touched;
      field.hasError && errorCounter++;
    });
    return errorCounter > 0;
  }

  private async onRegistrationSuccess(response): Promise<void> {
    this.modalCtrl.dismiss();
    const data = await (await this.registrationFacade.getData()).formData;
    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      componentProps: {
        pageContent: {
          dismissBtnText: data.dismissBtnText,
          resendEmailBtnText: data.resendEmail,
          title: data.successTitle,
          message: data.successMessage,
        },
      },
      component: RegistrationSuccessComponent,
    });
    await modal.present();
    this.loadingService.closeSpinner();
    await modal.onDidDismiss();
  }

  async submitRegistration(formGroup: FormGroup): Promise<void> {
    if (this.formInvalid) {
      return;
    }

    await this.loadingService.showSpinner(this.customLoadingOptions);
    this.registrationFacade.submit(formGroup.value).subscribe(
      ({ response }) => this.onRegistrationSuccess(response),
      async error => {
        const [errorCode] = error.message.split('|');
        const { formData } = await this.registrationFacade.getData();
        const message = ValidErrorCodes[errorCode] || formData.registrationFailedMessage;
        this.toastService.showToast({ message, duration: 6000 });
        this.loadingService.closeSpinner();
      }
    );
  }
}

const ValidErrorCodes = {
  6101: 'Cannot find a match for given user information',
};
