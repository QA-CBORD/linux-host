import { MerchantListService } from './service/merchant-list.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { MerchantInfo } from './models/merchant-info';

@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
})
export class OrderingPage implements OnInit {

  merchantList$: Observable<MerchantInfo[]>;

  constructor(private readonly mls: MerchantListService) { }

  ngOnInit() {

    this.merchantList$ = this.mls.getMerchantsWithFavoriteInfo();
    

  }
  

  favouriteHandler(id: string) {
    console.log("Favorite Clicked");
    
  }

}
