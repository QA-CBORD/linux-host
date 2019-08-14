import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { Observable } from 'rxjs';
import { UserAccount } from '../../../../core/model/account/account.model';
import { REQUEST_FUNDS_CONTROL_NAMES } from './config';

@Component({
  selector: 'st-request-funds-page',
  templateUrl: './request-funds-page.component.html',
  styleUrls: ['./request-funds-page.component.scss'],
})
export class RequestFundsPageComponent implements OnInit {
  accounts$: Observable<UserAccount[]>;
  requestFunds: FormGroup;
  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  constructor(private readonly fb: FormBuilder, private readonly accountService: AccountsService) {}

  get email(): AbstractControl {
    return this.requestFunds.controls['email'];
  }

  get name(): AbstractControl {
    return this.requestFunds.controls['name'];
  }

  get accounts(): AbstractControl {
    return this.requestFunds.controls['accounts'];
  }

  get controlsNamesEnum(): any {
    return REQUEST_FUNDS_CONTROL_NAMES;
  }

  ngOnInit() {
    this.initForm();
    this.accounts$ = this.accountService.accounts$;
  }

  // rexp ^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$

  private initForm() {
    this.requestFunds = this.fb.group(
      {
        email: this.fb.control('', Validators.required),
        name: this.fb.control('', Validators.required),
        accounts: this.fb.control('', Validators.required),
        message: this.fb.control(''),
      },
      { updateOn: 'blur' }
    );
  }

  submit() {
    console.log(this.name);
  }
}
