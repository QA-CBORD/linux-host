import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';
import { ROLES } from 'src/app/app.global';
import { GUEST_ROUTES } from 'src/app/non-authorized/non-authorized.config';
import { formField, PageSetting } from '../../models/registration.shared.model';
import { RegistrationServiceFacade } from '../../services/registration-service-facade';

@Component({
  selector: 'st-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  settings: PageSetting;
  formFields: formField[]=[];

  constructor(
    private readonly registrationServiceFacade: RegistrationServiceFacade,
    private readonly route: ActivatedRoute,
    private globalNav: GlobalNavService
  ) {}

  ngOnInit() {
    this.globalNav.hideNavBar();
    this.settings = this.registrationServiceFacade.getSetting();
    this.formFields = this.registrationServiceFacade.getFormFields();
    console.log('settings: ', this.settings, this.formFields);
  }

  get defaultBackUrl() {
    return [ROLES.guest, GUEST_ROUTES.entry];
  }

  submitRegistration(data): void {
    console.log('submitted data: ', data);
    this.registrationServiceFacade.register().subscribe();
  }
}
