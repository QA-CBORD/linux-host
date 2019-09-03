import { MerchantListService } from './service/merchant-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-ordering.page',
  templateUrl: './ordering.page.html',
  styleUrls: ['./ordering.page.scss'],
})
export class OrderingPage implements OnInit {

  constructor(private readonly mls: MerchantListService) { }

  ngOnInit() {

    this.mls.getMenuMerchants().subscribe(resp => console.log(resp));
    

  }
  

}
