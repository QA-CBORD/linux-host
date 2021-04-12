import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Field } from 'src/app/non-authorized/pages/registration/models/registration-utils';
import { RegistrationService } from '../../non-authorized/pages/registration/services/registration.service';
import { ValidationController } from '../models/input-validator.model';

@Component({
  selector: 'st-input-validator',
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.scss'],
})
export class InputValidatorComponent implements OnInit {
  @Input() validators: ValidationController[] = [];
  @Input() control: AbstractControl | Field;

  constructor(protected backendService: RegistrationService) {}

  ngOnInit() {
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
          formField.touched = true;
          validator.test(value) == false && errorCounter++;
        });
        formField.hasError = errorCounter > 0;
      });
    }
  }
}
