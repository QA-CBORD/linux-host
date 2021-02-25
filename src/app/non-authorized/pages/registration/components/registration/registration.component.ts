import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalController } from '@ionic/angular';
import { Handler } from '@shared/model/shared-api';
import { Observable, of } from 'rxjs';
import { STATICFIELDS } from '../../models/form-config';
import { formField } from '../../models/registration.shared.model';
import { RegistrationServiceFacade } from '../../services/registration-service-facade';

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
  passwordsNotMatching: boolean;
  confirmPasswordComplete: boolean = false;

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
    const data = await this.registrationFacade.pageContentStrings();
    this.title$ = of(data.screen_title);
    this.btnText$ = of(data.submit_btn_text.toLowerCase());
  }

  private async formFieldsetup(): Promise<void> {
    const formFieldList = await this.registrationFacade.getFormFields();
    const fields = [...formFieldList.horizontalAlignedFields, ...formFieldList.verticalAlignedFields];
    this.registrationFormGroup = this.fb.group(formFieldList.controls);
    fields.forEach(field => (field.control = this.registrationFormGroup.get(field.name)));
    this.horizontalFields = formFieldList.horizontalAlignedFields;
    this.formFields = formFieldList.verticalAlignedFields;
    this.observePasswordChangeEvents();
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
    const formGroup = this.registrationFormGroup;
    const confirmPasswordComplete = this.confirmPasswordComplete;
    return {
      handle: function(data) {
        field.hasError = field.control.invalid;
        if (field.name == STATICFIELDS.phone) {
          const fieldValue: string = formGroup.get(STATICFIELDS.phone).value;
          if (fieldValue) {
            field.hasError = !/^[0-9]*$/.test(fieldValue) || !(fieldValue.length > 9 && fieldValue.length < 12)
          } else {
            field.hasError = false;
          }
        }
        if(field.name == STATICFIELDS.password || field.name == STATICFIELDS.passwordConfirm){
           field.hasError = !confirmPasswordComplete || this.passwordsNotMatching;
        }
      },
    };
  }

  observePasswordChangeEvents(): void {
    const passwordConfirmControl = this.registrationFormGroup.get(STATICFIELDS.passwordConfirm);
    const password = this.registrationFormGroup.get(STATICFIELDS.password);
    const confirmPasswordField = this.formFields.find(
      ({ name: fieldName }) => fieldName == STATICFIELDS.passwordConfirm
    );

    const passwordField = this.formFields.find(({ name: fieldName }) => fieldName == STATICFIELDS.password);

    password.valueChanges.subscribe(value => {
      if (passwordConfirmControl.value) {
        this.passwordsNotMatching = !passwordConfirmControl.value.startsWith(value);
        this.confirmPasswordComplete = passwordConfirmControl.touched && passwordConfirmControl.value === value;
        passwordField.hasError = this.passwordsNotMatching;
      }
    });

    passwordConfirmControl.valueChanges.subscribe(value => {
      this.passwordsNotMatching = !password.value.startsWith(value);
      this.confirmPasswordComplete = password.touched && password.value === value;
      confirmPasswordField.hasError = this.passwordsNotMatching;
    });
  }

  get disabled(): boolean {
    if (!this.registrationFormGroup) return true;
    return this.registrationFormGroup.invalid || !this.confirmPasswordComplete || this.passwordsNotMatching;
  }

  onDecline() {
    this.modalCtrl.dismiss(false);
  }

  async submitRegistration(formGroup: FormGroup): Promise<void> {
    const formInvalid = this.disabled;
    if (formInvalid) {
      console.log(this.horizontalFields);
      const allFields = [...this.horizontalFields, ...this.formFields];
      allFields.forEach(field => (field.hasError = field.control.invalid || field.hasError));
      return;
    }

    await this.loadingService.showSpinner(this.customLoadingOptions);
    this.registrationFacade.register(formGroup.value).subscribe(
      ({ response }) => {
        const message = 'Registration Success. please sign in.';
        this.modalCtrl.dismiss();
        this.loadingService.closeSpinner();
        this.toastService.showToast({ message, duration: 5000 });
      },
      () => {
        const message = 'Registration failed. Please try again later.';
        this.toastService.showToast({ message });
        this.loadingService.closeSpinner();
      },
      () => {
        console.log('completed ===>>> ');
        this.loadingService.closeSpinner();
      }
    );
  }
}
