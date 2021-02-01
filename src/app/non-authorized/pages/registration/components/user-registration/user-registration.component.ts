import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, of } from 'rxjs';
import { guestRegistrationFormFields } from '../../models/guest-registration.config';
import { registrationStaticFormFields } from '../../models/registration-static.fields';
import { formField, PageSetting, PatronInfo } from '../../models/registration.shared.model';

@Component({
  selector: 'st-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
})
export class GuestRegistrationComponent implements OnInit {
  @Input() settings: PageSetting;
  @Output() submit: EventEmitter<any> = new EventEmitter();
  @Input() formFields: formField[] = [];

  registrationTitle$: Observable<string>;
  passwordRules$: Observable<string>;
  termsNotice$: Observable<string>;

  constructor() {}

  ngOnInit() {
    this.setupContentStrings()
  }



  setupContentStrings(): void {
    this.termsNotice$ = of(
      'By clicking Register you agree you have read the GET <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>'
    );
    this.registrationTitle$ = of('Guest Sign up');
    this.passwordRules$ = of(
      'Passwords must be between 7-12 characters in length Passwords must contain at least one letter and one number Passwords are case-sensitive'
    );
  }

  onSubmit(): void {
    console.log('data submitted');
    this.submit.emit(this.formFields);
  }

  onCancel(): void {
    console.log('cancelled');
  }


  onChange(data: { label: string, value: any}): void{

    console.log(data);
     


  }

}
