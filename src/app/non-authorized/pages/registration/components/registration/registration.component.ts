import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { ModalController } from '@ionic/angular';
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
    this.btnText$ = of(data.submit_btn_text);
  }

  private async formFieldsetup(): Promise<void> {
    const formFieldList = await this.registrationFacade.getFormFields();
    const fields = [...formFieldList.horizontalAlignedFields, ...formFieldList.verticalAlignedFields];
    this.registrationFormGroup = this.fb.group(formFieldList.controls);
    fields.forEach(field => (field.control = this.registrationFormGroup.get(field.name)));
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

  onDecline() {
    this.modalCtrl.dismiss(false);
  }

  async submitRegistration(formGroup: FormGroup): Promise<void> {
    // do validation here before submit.

    await this.loadingService.showSpinner(this.customLoadingOptions);
    this.registrationFacade.register(formGroup.value).subscribe(
      () => {
        const message = 'Registration Success. please sign in.';
        this.modalCtrl.dismiss();
        this.loadingService.closeSpinner();
        this.toastService.showToast({ message });
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
