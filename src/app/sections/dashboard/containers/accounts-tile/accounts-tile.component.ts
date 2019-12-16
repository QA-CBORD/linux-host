import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { ALL_ACCOUNTS } from '@sections/accounts/accounts.config';

@Component({
  selector: 'st-accounts-tile',
  templateUrl: './accounts-tile.component.html',
  styleUrls: ['./accounts-tile.component.scss'],
})
export class AccountsTileComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    spaceBetween: 0,
    speed: 400,
    width: 330,
    autoHeight: true,
  };

  showSpiner: boolean = true;
  userAccountsSlides = [];

  constructor(private readonly accountsService: AccountsService, private readonly router: Router) {}

  ngOnInit() {
    this.initUserAccounts();
  }

  private initUserAccounts() {
    let parsedAccountsByOneSlide = [];
    this.accountsService
      .getUserAccounts()
      .pipe(take(1))
      .subscribe(accounts => {
        accounts.forEach((item, index) => {
          if (index % 4 === 0 && index !== 0) {
            this.userAccountsSlides.push(parsedAccountsByOneSlide);
            parsedAccountsByOneSlide = [];
          }
          parsedAccountsByOneSlide.push(item);
        });
        if (parsedAccountsByOneSlide.length) {
          this.userAccountsSlides.push(parsedAccountsByOneSlide);
        }
        this.showSpiner = !this.showSpiner;
      });
  }

  goToAllAccounts() {
    this.router.navigate([`${NAVIGATE.accounts}`], { skipLocationChange: true });
  }
}
