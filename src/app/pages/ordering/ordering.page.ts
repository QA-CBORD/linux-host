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
}
