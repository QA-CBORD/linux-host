import { MerchantListService } from './service/merchant-list.service';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { MerchantInfo } from './models/merchant-info';
import { UserService } from 'src/app/core/service/user-service/user.service';

@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
})
export class OrderingPage implements OnInit {

  merchantList$: Observable<MerchantInfo[]>;

  constructor(private readonly mls: MerchantListService) { }

  ngOnInit() {    
    this.merchantList$ = this.mls.menuMerchants$;
    

  }
  

  favouriteHandler(id: string) {
    console.log(`Favorite Clicked - Merch Id: ${id}`);
    
  }

  locationPinHandler(id: string) {
    console.log(`Location Pin Clicked - Merch Id: ${id}`);
    
  }

}
