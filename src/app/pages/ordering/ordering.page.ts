import { MerchantListService } from './services';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { MerchantInfo } from './shared/models';

@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
})
export class OrderingPage implements OnInit {

  merchantList$: Observable<MerchantInfo[]>;

  constructor(private readonly merchantListService: MerchantListService) { }

  ngOnInit() {    
    this.merchantList$ = this.merchantListService.menuMerchants$;
  }
  

  favouriteHandler(id: string) {
    console.log(`Favorite Clicked - Merch Id: ${id}`);
    
  }

  locationPinHandler(id: string) {
    console.log(`Location Pin Clicked - Merch Id: ${id}`);
    
  }

}
