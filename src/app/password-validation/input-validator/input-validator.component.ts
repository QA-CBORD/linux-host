import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { Field } from 'src/app/non-authorized/pages/registration/models/registration-utils';
import { RegistrationService } from '../../non-authorized/pages/registration/services/registration.service';
import { buildPasswordValidators, InputValidator } from '../models/input-validator.model';

@Component({
  selector: 'st-input-validator',
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.scss'],
})
export class InputValidatorComponent implements OnInit {
  @Input() validators: InputValidator[] = [];
  @Input() control: AbstractControl | Field;

  constructor(protected backendService: RegistrationService) {}

  ngOnInit() {
    if (!this.validators || !this.validators.length) {
      this.loadDefaultPasswordValidators();
    }
    this.subscribe2ControlChanges();
  }

  subscribe2ControlChanges(): void {
    if (this.control instanceof AbstractControl) {
      this.control.valueChanges.subscribe(value => {
        this.validators.forEach(validator => validator.test(value));
      });
    } else {
      const formField = this.control;
      formField.control.valueChanges.subscribe(value => {
        let errorCounter = 0;
        this.validators.forEach(validator => {
          validator.test(value) == false && errorCounter++;
        });
        formField.hasError = errorCounter > 0;
      });
    }
  }

  private loadDefaultPasswordValidators(): void {
    this.backendService
      .getString$(CONTENT_STRINGS_CATEGORIES.passwordValidation)
      .pipe(
        take(1),
        map(data => buildPasswordValidators(data)),
        catchError(() => of(buildPasswordValidators()))
      )
      .subscribe(data => (this.validators = data));
  }
}
