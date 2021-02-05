import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { Observable, of } from 'rxjs';
import { formField, PageSetting } from '../../models/registration.shared.model';
import { RegistrationServiceFacade } from '../../services/registration-service-facade';

@Component({
  selector: 'st-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  settings: PageSetting;
  staticFields: formField[] = [];
  formFields: formField[] = [];
  registrationFormGroup: FormGroup;
  title$: Observable<string>;

  constructor(
    private readonly registrationServiceFacade: RegistrationServiceFacade,
    private readonly fb: FormBuilder,
    private globalNav: GlobalNavService,
    private readonly modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.title$ = of('Create An Account');
    this.setup();
  }

  private setup(): void {
    this.settings = this.registrationServiceFacade.getSetting();
    const fields = this.registrationServiceFacade.getFormFields();
    this.globalNav.hideNavBar();
    const controlsConfig = {};
    fields.map(field => (controlsConfig[field.controlName] = field.validator));
    this.registrationFormGroup = this.fb.group(controlsConfig);
    fields.forEach(field => (field.control = this.registrationFormGroup.get(field.controlName)));
    fields.forEach(field => {
      if (field.alignHorizontal) {
        this.staticFields.push(field);
      } else {
        this.formFields.push(field);
      }
    });
  }

  get firstNameField(): formField {
    return this.staticFields[0];
  }

  get lastNameField(): formField {
    return this.staticFields[1];
  }

  onDecline() {
    this.modalCtrl.dismiss(false);
  }

  submitRegistration(formGroup: FormGroup): void {
    console.log('submitted data: ', formGroup.value);
    this.registrationServiceFacade.register(formGroup.value).subscribe();
  }
}
