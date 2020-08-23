import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'st-update-contact-information',
  templateUrl: './update-contact-information.component.html',
  styleUrls: ['./update-contact-information.component.scss'],
})
export class UpdateContactInformationComponent implements OnInit {
 
  placeholderOfEmail$: Promise<string>;
  placeholderOfPhone$: Promise<string>;
  loginForm: FormGroup;

  constructor() { }
   
  get username(): AbstractControl {
    return this.loginForm.get(this.controlsNames.username);
  }

  get controlsNames() {
    return USERFORM_CONTROL_NAMES;
  }

  ngOnInit() {
  }
  
}

export enum USERFORM_CONTROL_NAMES {
  username = 'username'
}
