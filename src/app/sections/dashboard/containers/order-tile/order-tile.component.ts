import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MerchantInfo, MerchantService } from '@sections/ordering';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NAVIGATE } from '../../../../app.global';

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
  amountPerSlide: number = 2;
  slides: MerchantInfo[][] = [];
  skeletonArray: any[] = new Array(this.amountPerSlide);

  constructor(private readonly merchantService: MerchantService,
              private readonly cdRef: ChangeDetectorRef,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.initMerchantSlides();
  }

  private initMerchantSlides() {
    this.merchantService
      .getMerchantsWithFavoriteInfo()
      .pipe(take(1))
      .subscribe(merchants => {
        const favMerchants = merchants.filter(({ isFavorite }) => isFavorite);
        while (favMerchants.length > 0) {
          this.slides.push(favMerchants.splice(0, this.amountPerSlide));
        }
        this.cdRef.detectChanges();
      });
  }

  goToMerchant({id: merchantId}: MerchantInfo) {
    this.router.navigate([NAVIGATE.ordering], {skipLocationChange: true, queryParams: {merchantId}});
  }
}
