import { Component, OnInit } from '@angular/core';
import { AccountsService } from './services/accounts.service';
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

  userAccounts$ = [];
  parsedAccounts = [];

  constructor(private readonly accountsService: AccountsService) {}

  ngOnInit() {
    this.accountsService.getUserAccounts().subscribe(r => {
      r.forEach((item, index) => {
        if (index % 4 === 0 && index !== 0) {
          this.userAccounts$.push(this.parsedAccounts);
          this.parsedAccounts = [];
        }
        this.parsedAccounts.push(item);
      });
      this.userAccounts$.push(this.parsedAccounts);
    });
  }
}
