import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AccountsService } from '@sections/dashboard/services';
import { take, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { UserAccount } from '@core/model/account/account.model';
import { LOCAL_ROUTING } from '@sections/accounts/accounts.config';
import SwiperCore, { Pagination } from 'swiper';
import { IonicSlides } from '@ionic/angular';
import { DASHBOARD_SLIDE_CONFIG } from '@sections/dashboard/dashboard.config';
SwiperCore.use([Pagination, IonicSlides]);

@Component({
  selector: 'st-accounts-tile',
  templateUrl: './accounts-tile.component.html',
  styleUrls: ['./accounts-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsTileComponent {
  slideOpts = { ...DASHBOARD_SLIDE_CONFIG, slidesPerView: 1.01 };
  itemsPerSlide = 4;
  slides: UserAccount[][] = [];
  isLoading = true;
  pager = false;

  constructor(
    private readonly accountsService: AccountsService,
    private readonly router: Router,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  getUserAccounts() {
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
        this.pager = accounts.length > this.itemsPerSlide;
        this.slides = [];
        while (accounts.length > 0) {
          this.slides.push(accounts.splice(0, this.itemsPerSlide));
        }
      });
  }

  goToAccountHistory(id: string) {
    this.router.navigate([`${PATRON_NAVIGATION.accounts}/${LOCAL_ROUTING.accountDetailsM}/${id}`]);
  }
}
