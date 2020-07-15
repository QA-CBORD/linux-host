import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AccountsService } from '@sections/dashboard/services';
import { take, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { UserAccount } from '@core/model/account/account.model';
import { LOCAL_ROUTING } from '@sections/accounts/accounts.config';

@Component({
  selector: 'st-accounts-tile',
  templateUrl: './accounts-tile.component.html',
  styleUrls: ['./accounts-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsTileComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    spaceBetween: 0,
    speed: 400,
    width: 350,
    autoHeight: true,
  };
  itemsPerSlide: number = 4;
  slides: UserAccount[][] = [];
  isLoading: boolean = true;
  pager: boolean = false;

  constructor(
    private readonly accountsService: AccountsService,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initUserAccounts();
  }

  private initUserAccounts() {
    this.accountsService
      .getAccountsFilteredByDisplayTenders()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe(accounts => {
        //GCS-1928 Hide Pager Icon if only on slide.
        this.pager = accounts.length > this.itemsPerSlide;

        while (accounts.length > 0) {
          this.slides.push(accounts.splice(0, this.itemsPerSlide));
        }
      });
  }

  goToAccountHistory(id: string) {
    this.router.navigate([`${PATRON_NAVIGATION.accounts}/${LOCAL_ROUTING.accountDetailsM}/${id}`]);
  }
}
