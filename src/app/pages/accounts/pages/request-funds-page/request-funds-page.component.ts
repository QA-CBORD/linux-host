import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { Observable } from 'rxjs';
import { UserAccount } from '../../../../core/model/account/account.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'st-request-funds-page',
  templateUrl: './request-funds-page.component.html',
  styleUrls: ['./request-funds-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestFundsPageComponent implements OnInit {
  accounts$: Observable<UserAccount[]>;
  requestFunds: FormGroup;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  constructor(private readonly fb: FormBuilder, private readonly accountService: AccountsService) {
  }

  get email(): AbstractControl {
    return this.requestFunds.controls[this.controlsNames.email];
  }

  get name(): AbstractControl {
    return this.requestFunds.controls[this.controlsNames.name];
  }

  get message(): AbstractControl {
    return this.requestFunds.controls[this.controlsNames.message];
  }

  get accounts(): AbstractControl {
    return this.requestFunds.controls[this.controlsNames.accounts];
  }

  get controlsNames() {
    return REQUEST_FUNDS_CONTROL_NAMES;
  }

  ngOnInit() {
    this.accounts$ = this.accountService.accounts$.pipe(
      map((accounts: UserAccount[]) => accounts.filter(account => account.depositAccepted) )
    );
    this.initForm();
  }

  private initForm() {
    const nameErrors = [
      errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.name].required),
      errorDecorator(Validators.minLength(2), CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.name].minlength),
      errorDecorator(Validators.maxLength(255), CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.name].maxlength),
    ];

    const emailErrors = [
      errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.email].required),
      errorDecorator(validateEmail, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.email].incorrect),
      errorDecorator(Validators.maxLength(255), CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.email].maxlength),
    ];

    const accountErrors = [
      errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.accounts].required),
    ];

    const messageErrors = [
      errorDecorator(Validators.required, CONTROL_ERROR[REQUEST_FUNDS_CONTROL_NAMES.message].required),
    ];

    this.requestFunds = this.fb.group(
      {
        [this.controlsNames.name]: ['', nameErrors],
        [this.controlsNames.email]: ['', emailErrors],
        [this.controlsNames.accounts]: ['', accountErrors],
        [this.controlsNames.message]: ['', messageErrors],
      },
    );
  }

  submit() {
    console.log(this.requestFunds);
  }
}

export enum REQUEST_FUNDS_CONTROL_NAMES {
  name = 'name',
  email = 'email',
  accounts = 'accounts',
  message = 'message',
}

export const CONTROL_ERROR = {
  [REQUEST_FUNDS_CONTROL_NAMES.name]: {
    required: 'You must enter a name.',
    minlength: 'Name should be more than 2 symbols.',
    maxlength: 'Name should be shorten than 255 symbols.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.email]: {
    required: 'You must enter an email address.',
    incorrect: 'Please enter valid email.',
    maxlength: 'Email should be shorten than 255 symbols.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.accounts]: {
    required: 'You must choose an account.',
  },
  [REQUEST_FUNDS_CONTROL_NAMES.message]: {
    required: 'Please enter a message.',
  },
};

const validateEmail = ({ value }: AbstractControl): ValidationErrors | null => {
  const test = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z]+(\.[a-z]+)*\.[a-z]{2,6}$/gi.test(value);
  return test ? null : { incorrect: true };
};

const errorDecorator = (fn: ValidatorFn, errorMsg: string): (control: AbstractControl) => ValidationErrors | null => {
  return (control) => {
    return (fn(control) === null) ? null : { errorMsg };
  };
};