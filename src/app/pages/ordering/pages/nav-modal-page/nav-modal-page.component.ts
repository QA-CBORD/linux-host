import { MerchantService } from './../../services/merchant.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NAV_ORDERS_PAGES } from './nav-modal.config';
import { NAVIGATE } from 'src/app/app.global';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderItem } from '@pages/ordering';
import { OrderInfo } from '@pages/ordering/shared';

@Component({
  selector: 'st-nav-modal-page',
  templateUrl: './nav-modal-page.component.html',
  styleUrls: ['./nav-modal-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavModalPage implements OnInit {
  title: string;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly mS:MerchantService) {}

  ngOnInit() {
    this.testing();
    // console.log(this.activatedRoute.data);
    this.activatedRoute.params.pipe(take(1)).subscribe(data => {
      this.title = NAV_ORDERS_PAGES[data.destinationPage].title;
    });
  }

  onModalClose() {
    this.router.navigate([`${NAVIGATE.ordering}`], { skipLocationChange: true });
  }


  recentOrders$: Observable<OrderInfo[]>;
  testing(){
    this.recentOrders$ = this.mS.getRecentOrders();
  }
}
