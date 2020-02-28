import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MerchantInfo, MerchantService } from '@sections/ordering';
import { take, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NAVIGATE } from '../../../../app.global';
import { Environment } from 'src/app/environment';

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

  awsImageUrl: string = Environment.getImageURL();
  amountPerSlide: number = 2;
  slides: MerchantInfo[][] = [];
  skeletonArray: any[] = new Array(this.amountPerSlide);
  isLoading: boolean = true;

  constructor(
    private readonly merchantService: MerchantService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.initMerchantSlides();
  }

  private initMerchantSlides() {
    this.merchantService
      .getMerchantsWithFavoriteInfo()
      .pipe(
        take(1),
        finalize(()=> {
          this.isLoading = false;
          this.cdRef.detectChanges();
        })
      )
      .subscribe(merchants => {
        const favMerchants = merchants.filter(({ isFavorite }) => isFavorite);
        while (favMerchants.length > 0) {
          this.slides.push(favMerchants.splice(0, this.amountPerSlide));
        }
      });
  }

  goToMerchant({ id: merchantId }: MerchantInfo) {
    this.router.navigate([NAVIGATE.ordering], { skipLocationChange: true, queryParams: { merchantId } });
  }
}
