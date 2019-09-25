import { MerchantService } from './services';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { MerchantInfo } from './shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
})
export class OrderingPage implements OnInit {
  merchantList$: Observable<MerchantInfo[]>;

  constructor(private readonly merchantListService: MerchantService, private readonly router: Router) {}

  ngOnInit() {
    this.merchantList$ = this.merchantListService.menuMerchants$;
  }

  menuOrderingRedirect(path: any) {
    console.log(this.router);
    console.log(path);
    
    
    this.router.navigate(['ordering', `${path}`], { skipLocationChange: true });
  }

  merchantClickHandler(id: string) {
    console.log(`Merchant Clicked - Merch Id: ${id}`);
  }

  favouriteHandler(id: string) {
    console.log(`Favorite Clicked - Merch Id: ${id}`);
  }

  locationPinHandler(id: string) {
    console.log(`Location Pin Clicked - Merch Id: ${id}`);
  }
}
