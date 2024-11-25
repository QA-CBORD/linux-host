import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { ToastService } from '@core/service/toast/toast.service';
import { IonicSlides } from '@ionic/angular';
import { DASHBOARD_SLIDE_CONFIG } from '@sections/dashboard/dashboard.config';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { CartService, MerchantInfo, MerchantService } from '@sections/ordering';
import { TOAST_MESSAGES } from '@sections/ordering/ordering.config';
import { ActiveCartService } from '@sections/ordering/services/active-cart.service';
import { APP_ROUTES } from '@sections/section.config';
import { LockDownService, NavigationService } from '@shared/services';
import { finalize, take } from 'rxjs/operators';
import SwiperCore from 'swiper';
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

  private readonly cartService: CartService = inject(CartService);
  private readonly activeCartSerive = inject(ActiveCartService);

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly merchantService: MerchantService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly router: NavigationService,
    private readonly toastService: ToastService,
    private readonly lockDownService: LockDownService
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

  async goToMerchant(merchantInfo: MerchantInfo) {
    if (this.lockDownService.isLockDownOn()) {
      return;
    }

    if (merchantInfo?.walkout) {
      await this.toastService.showError({ message: TOAST_MESSAGES.isWalkOut });
      return;
    }

    this.activeCartSerive.preValidateOrderFlow(
      merchantInfo.id,
      this.navigateToOrdering.bind(this, merchantInfo)
    );
  }

  private navigateToOrdering(merchantInfo: MerchantInfo) {
    this.router.navigate([APP_ROUTES.ordering], { queryParams: { merchantId: merchantInfo.id } });
  }
}
