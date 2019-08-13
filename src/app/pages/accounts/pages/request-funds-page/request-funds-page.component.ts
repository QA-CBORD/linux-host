import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsService } from '../../services/accounts.service';
import { Observable } from 'rxjs';
import { UserAccount } from '../../../../core/model/account/account.model';

@Component({
  selector: 'st-request-funds-page',
  templateUrl: './request-funds-page.component.html',
  styleUrls: ['./request-funds-page.component.scss'],
})
export class RequestFundsPageComponent implements OnInit {
  accounts$: Observable<UserAccount[]>;
  requestFunds: FormGroup;
  constructor(private readonly fb: FormBuilder, private readonly accountService: AccountsService) {}

  ngOnInit() {
    this.initForm();
    this.accounts$ = this.accountService.accounts$;
  }

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
    console.log(this.requestFunds);
  }
}
