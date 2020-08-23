import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'st-update-contact-information',
  templateUrl: './update-contact-information.component.html',
  styleUrls: ['./update-contact-information.component.scss'],
})
export class UpdateContactInformationComponent implements OnInit {
 
  placeholderOfEmail$: string;  // Promise?
  placeholderOfPhone$: string;  // Promise?
  loginForm: FormGroup;

  constructor() { }
   
  get username(): AbstractControl {
    return this.loginForm.get(this.controlsNames.username);
  }

  get controlsNames() {
    return USERFORM_CONTROL_NAMES;
  }

  ngOnInit() {
    this.placeholderOfEmail$ = 'sample@email.com';
    this.placeholderOfPhone$ = '12345';
  }
  
}

export enum USERFORM_CONTROL_NAMES {
  username = 'username'
}
