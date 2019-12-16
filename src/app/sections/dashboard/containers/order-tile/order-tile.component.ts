import { Component, OnInit } from '@angular/core';
import { MerchantService } from '@sections/ordering';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.scss'],
})
export class OrderTileComponent implements OnInit {
  slideOpts = {
    initialSlide: 0,
    spaceBetween: 0,
    speed: 400,
    width: 330,
    autoHeight: true,
  };

  userMarchentsSlides = [];
  showSpiner = true;

  constructor(private readonly merchantService: MerchantService) {}

  ngOnInit() {
    this.initMerchantSlides();
  }

  private initMerchantSlides() {
    let parsedMarchentsByOneSlide = [];
    this.merchantService
      .getMerchantsWithFavoriteInfo()
      .pipe(take(1))
      .subscribe(merchants => {
        merchants
          .filter(({ isFavorite }) => isFavorite === true)
          .forEach((item, index) => {
            if (index % 2 === 0 && index !== 0) {
              this.userMarchentsSlides.push(parsedMarchentsByOneSlide);
              parsedMarchentsByOneSlide = [];
            }
            parsedMarchentsByOneSlide.push(item);
          });
        if (parsedMarchentsByOneSlide.length) {
          this.userMarchentsSlides.push(parsedMarchentsByOneSlide);
        }
        this.showSpiner = false;
      });
  }
}
