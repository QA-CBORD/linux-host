import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  showSpiner = true;

  userAccountsSlides = [];
  parsedAccountsByOneSlide = [];

  constructor(private readonly accountsService: AccountsService) {}

  ngOnInit() {
    

    this.accountsService.getUserAccounts().pipe(
      take(1)
    ).subscribe(accounts => {
      accounts.forEach((item, index) => {
        if (index % 4 === 0 && index !== 0) {
          this.userAccountsSlides.push(this.parsedAccountsByOneSlide);
          this.parsedAccountsByOneSlide = [];
        }
        this.parsedAccountsByOneSlide.push(item);
      });
      this.userAccountsSlides.push(this.parsedAccountsByOneSlide);
      this.showSpiner = false;
    });
    
  }
}
