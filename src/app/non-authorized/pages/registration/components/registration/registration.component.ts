import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { formControlErrorDecorator } from '@core/utils/general-helpers';
import { ModalController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import {
  buildPasswordValidators,
  ValidationController,
} from 'src/app/password-validation/models/input-validator.model';
import { Field, formField, STATICFIELDS } from '../../models/registration-utils';
import { RegistrationServiceFacade } from '../../services/registration-service-facade';
import { RegistrationSuccessComponent } from '../registration-success/registration-success.component';

const mediaType = 'Media Value';

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
  passwordValidators: ValidationController[] = [];
  allFields: Field[] = [];
  firstNameField: formField;
  lastNameField: formField;
  passwordField: formField;
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
    const { registrationCs, passwordValidationCs } = await (await this.registrationFacade.getData()).contentString;
    this.title$ = of(registrationCs.title);
    this.btnText$ = of(registrationCs.submitBtnTxt);
    this.passwordValidators = buildPasswordValidators(passwordValidationCs);
  }

  private async formFieldsetup(): Promise<void> {
    const { fieldList: formFieldList } = await this.registrationFacade.getData();
    const fields = [...formFieldList.horizontalAlignedFields, ...formFieldList.verticalAlignedFields];
    this.allFields = fields;
    this.registrationFormGroup = this.fb.group(formFieldList.controls);
    fields.forEach(field => {
      field.control = this.registrationFormGroup.get(field.name);
      field.control.setValidators(field.errorMessage);
      if (field.name != STATICFIELDS.password) {
        field.control.valueChanges.subscribe(value => {
          field.touched = true;
          field.value = value;
          field.validate();
        });
        if (field.label == mediaType) {
            this.mediaErrorMessage(field);
        }
      }
    });
    this.horizontalFields = formFieldList.horizontalAlignedFields;
    this.formFields = formFieldList.verticalAlignedFields;
    this.initializeFields();
  }

  initializeFields(): void {
    const { firstName, lastName, password } = STATICFIELDS;
    this.firstNameField = this.horizontalFields.find(({ idd: fieldName }) => fieldName == firstName.idd);
    this.lastNameField = this.horizontalFields.find(({ idd: fieldName }) => fieldName == lastName.idd);
    this.passwordField = this.formFields.find(({ name: fieldName }) => fieldName == password);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async onRegistrationSuccess(response): Promise<void> {
    this.modalCtrl.dismiss();
    const { registrationCs: contentStrings } = await (await this.registrationFacade.getData()).contentString;
    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      componentProps: {
        pageContent: {
          dismissBtnText: contentStrings.dismissBtnText,
          resendEmailBtnText: contentStrings.resendEmail,
          title: contentStrings.successTitle,
          message: contentStrings.successMessage,
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
        const { registrationCs } = await (await this.registrationFacade.getData()).contentString;
        const message = registrationCs.fromCodeOrDefaultErrortext(errorCode);
        this.toastService.showToast({ message, duration: 6000 });
        this.loadingService.closeSpinner();
      }
    );
  }
  
  private mediaErrorMessage(field: Field) {
    field.control.setValidators(formControlErrorDecorator(Validators.required,
      'Media value is required'));
  }
}
