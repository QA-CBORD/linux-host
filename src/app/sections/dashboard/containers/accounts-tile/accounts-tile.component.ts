import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { take } from 'rxjs/operators';
import { UserAccount } from '@core/model/account/account.model';

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

  constructor(private readonly accountsService: AccountsService) { }

  ngOnInit() {
    this.initUserAccounts();
  }

  private initUserAccounts() {
    let parsedAccountsByOneSlide = [];
    this.accountsService.getUserAccounts().pipe(
      take(1)
    ).subscribe(accounts => {
      accounts.forEach((item, index) => {
        if (index % 4 === 0 && index !== 0) {
          this.userAccountsSlides.push(parsedAccountsByOneSlide);
          parsedAccountsByOneSlide = [];
        }
        parsedAccountsByOneSlide.push(item);
      });
      this.userAccountsSlides.push(parsedAccountsByOneSlide);
      this.showSpiner = !this.showSpiner;
    });
  }
}
