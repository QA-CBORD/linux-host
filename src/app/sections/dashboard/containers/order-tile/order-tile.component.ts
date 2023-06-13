import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MerchantInfo, MerchantService } from '@sections/ordering';
import { take, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from '../../../../app.global';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { IonicSlides } from '@ionic/angular';
import { DASHBOARD_SLIDE_CONFIG } from '@sections/dashboard/dashboard.config';
import SwiperCore from 'swiper';
import { TOAST_MESSAGES } from '@sections/ordering/ordering.config';
import { ToastService } from '@core/service/toast/toast.service';
import { TileWrapperConfig } from '@sections/dashboard/models';
SwiperCore.use([IonicSlides]);

@Component({
  selector: 'st-order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTileComponent implements OnInit {
  @Input() wrapperConfig: TileWrapperConfig;
  slideOpts = { ...DASHBOARD_SLIDE_CONFIG, slidesPerView: 2.01 };

  awsImageUrl: string = this.environmentFacadeService.getImageURL();
  amountPerSlide = 1;
  slides: MerchantInfo[][] = [];
  skeletonArray: number[] = new Array(this.amountPerSlide);
  isLoading = true;

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly merchantService: MerchantService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.initMerchantSlides();
  }

  initMerchantSlides() {
    this.merchantService
      .getMerchantsWithFavoriteInfo()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe(merchants => {
        this.slides = [];
        const favMerchants = merchants.filter(({ isFavorite }) => isFavorite);

        while (favMerchants.length > 0) {
          this.slides.push(favMerchants.splice(0, this.amountPerSlide));
        }
      });
  }

  async goToMerchant({ id: merchantId, walkout }: MerchantInfo) {
    if (walkout) {
      await this.toastService.showError(TOAST_MESSAGES.isWalkOut);
      return;
    }

    if (this.wrapperConfig.stopNavigation) {
      await this.toastService.showError(this.wrapperConfig.stopNavigationMessage);
      return;
    }

    this.router.navigate([PATRON_NAVIGATION.ordering], { queryParams: { merchantId } });
  }
}
