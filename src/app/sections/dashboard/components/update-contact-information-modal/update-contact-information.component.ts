import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { GlobalNavService } from '@shared/ui-components/st-global-navigation/services/global-nav.service';

@Component({
  selector: 'st-update-contact-information',
  templateUrl: './update-contact-information.component.html',
  styleUrls: ['./update-contact-information.component.scss'],
})
export class UpdateContactInformationComponent implements OnInit {
 
  placeholderOfEmail$: Promise<string>; 
  placeholderOfPhone$: Promise<string>;
  loginForm: FormGroup;

  constructor( private readonly globalNavService: GlobalNavService) { }
   
  get username(): AbstractControl {
    return this.loginForm.get(this.controlsNames.username);
  }

  get controlsNames() {
    return USERFORM_CONTROL_NAMES;
  }

  ngOnInit() {
    this.globalNavService.hideNavBar();
  }

  ngOnDestroy() {
    this.globalNavService.showNavBar();
  }
}

export enum USERFORM_CONTROL_NAMES {
  username = 'username'
}
