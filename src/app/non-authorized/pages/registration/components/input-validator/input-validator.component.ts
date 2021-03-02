import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { of } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';
import { CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { buildPasswordValidators, InputValidator } from '../../models/password-validation';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'st-input-validator',
  templateUrl: './input-validator.component.html',
  styleUrls: ['./input-validator.component.scss'],
})
export class InputValidatorComponent implements OnInit {
  @Input() validators: InputValidator[] = [];
  @Input() control: AbstractControl;

  constructor(protected backendService: RegistrationService) {}

  ngOnInit() {
    if(!this.validators || !this.validators.length) {
      this.backendService
        .getString$(CONTENT_STRINGS_CATEGORIES.passwordValidation)
        .pipe(
          take(1),
          map(data => buildPasswordValidators(data)),
          catchError(() => of(buildPasswordValidators()))
        )
        .subscribe(data => (this.validators = data));
    }
    this.subscribe2ControlChanges();
  }

  subscribe2ControlChanges(): void {
    this.control.valueChanges.subscribe(value => {
      this.validators.forEach(validator => validator.test(value));
    });
  }
}
