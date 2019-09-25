import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantInfo } from '@pages/ordering';

@Component({
  selector: 'st-favorite-merchants',
  templateUrl: './favorite-merchants.component.html',
  styleUrls: ['./favorite-merchants.component.scss'],
})
export class FavoriteMerchantsComponent implements OnInit {

  merchantList: MerchantInfo[];
  constructor(
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ data }) => this.merchantList = data);
  }

}
