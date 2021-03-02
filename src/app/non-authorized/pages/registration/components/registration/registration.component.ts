import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { Handler } from '@shared/model/shared-api';
import { Observable, of } from 'rxjs';
import { InputValidator } from '../../models/password-validation';
import { formField, STATICFIELDS } from '../../models/registration-utils';
import { RegistrationServiceFacade } from '../../services/registration-service-facade';
import { RegistrationSuccessComponent } from '../registration-success/registration-success.component';

@Component({
  selector: 'st-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  horizontalFields: formField[] = [];
  formFields: formField[] = [];
  registrationFormGroup: FormGroup;
  title$: Observable<string>;
  btnText$: Observable<string>;
  passwordValidators: InputValidator[] = [];

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
    this.title$ = of(formData.screen_title);
    this.btnText$ = of(formData.submit_btn_text);
    this.passwordValidators = formData.passwordValidators;
  }

  private async formFieldsetup(): Promise<void> {
    const { fieldList: formFieldList } = await this.registrationFacade.getData();
    const fields = [...formFieldList.horizontalAlignedFields, ...formFieldList.verticalAlignedFields];
    this.registrationFormGroup = this.fb.group(formFieldList.controls);
    fields.forEach(field => {
      field.control = this.registrationFormGroup.get(field.name);
      field.control.valueChanges.subscribe(value => {
        field.touched = true;
        field.value = value;
        field.validate();
      });
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

  onBlur(field: formField): Handler {
    return {
      handle: data => field.validate(),
    };
  }

  get password(): AbstractControl {
    return this.registrationFormGroup && this.registrationFormGroup.get(STATICFIELDS.password);
  }

  get disabled(): boolean {
    if (!this.registrationFormGroup) return true;
    return this.formInvalid;
  }

  onDecline() {
    this.modalCtrl.dismiss(false);
  }

  private get formInvalid(): boolean {
    const allFields = [...this.horizontalFields, ...this.formFields];
    let errorCounter = 0;
    allFields.forEach(field => field.validate() && errorCounter++);
    return errorCounter > 0;
  }

  private async onRegistrationSuccess(response): Promise<void> {
    const { success_dismiss_btn, success_resend_email } = await (await this.registrationFacade.getData()).formData;

    const modal = await this.modalCtrl.create({
      backdropDismiss: false,
      componentProps: {
        pageContent: {
          dismissBtnText: success_dismiss_btn,
          resendEmailBtnText: success_resend_email,
        },
      },
      component: RegistrationSuccessComponent,
    });

    await modal.present();
    this.loadingService.closeSpinner();
    const { data } = await modal.onDidDismiss();
    console.log('first modal dismissed: ', data);
    this.modalCtrl.dismiss();
  }

  async submitRegistration(formGroup: FormGroup): Promise<void> {
    if (this.formInvalid) {
      return;
    }

    await this.loadingService.showSpinner(this.customLoadingOptions);
    this.registrationFacade.submit(formGroup.value).subscribe(
      ({ response }) => this.onRegistrationSuccess(response),
      () => {
        const message = 'Registration failed. Please try again later.';
        this.toastService.showToast({ message, duration: 6000 });
        this.loadingService.closeSpinner();
      }
    );
  }
}
