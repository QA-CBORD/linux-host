import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MerchantInfo, MerchantService } from '@sections/ordering';
import { take, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from '../../../../app.global';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';

@Component({
  selector: 'st-order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTileComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    spaceBetween: 0,
    speed: 400,
    width: 330,
    autoHeight: true,
  };

  awsImageUrl: string = this.environmentFacadeService.getImageURL();
  amountPerSlide = 2;
  slides: MerchantInfo[][] = [];
  skeletonArray: any[] = new Array(this.amountPerSlide);
  isLoading = true;

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
    private readonly merchantService: MerchantService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly router: Router
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

  goToMerchant({ id: merchantId }: MerchantInfo) {
    this.router.navigate([PATRON_NAVIGATION.ordering], { queryParams: { merchantId } });
  }
}
