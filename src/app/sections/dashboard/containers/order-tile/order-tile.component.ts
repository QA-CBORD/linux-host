import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MerchantService } from '@sections/ordering';
import { take } from 'rxjs/operators';

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
  slides = [];
  skeletonArray: any[] = new Array(this.amountPerSlide);

  constructor(private readonly merchantService: MerchantService,
              private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initMerchantSlides();
  }

  private initMerchantSlides() {
    this.merchantService
      .getMerchantsWithFavoriteInfo()
      .pipe(take(1))
      .subscribe(merchants => {
        const favMerchants = merchants.filter(({ isFavorite }) => isFavorite === true);
        while (favMerchants.length > 0) {
          this.slides.push(favMerchants.splice(0, this.amountPerSlide));
        }
        this.cdRef.detectChanges();
      });
  }

  goToMerchant(merchant: any) {
    console.log(merchant)
  }
}
