import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING } from '../../ordering.config';
import { OrderPageNames } from '../../pages/nav-modal-page/nav-modal.config';

@Component({
  selector: 'st-menu-ordering',
  templateUrl: './menu-ordering.component.html',
  styleUrls: ['./menu-ordering.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuOrderingComponent {
  orderPageNames = OrderPageNames; // so it can be accesed in the template

  constructor(private readonly router: Router) {}

  async openModalPage(titlePage: OrderPageNames): Promise<void> {
    this.router.navigate([`${NAVIGATE.ordering}/${LOCAL_ROUTING.ordersInfo}/${titlePage}`], {
      skipLocationChange: true,
    });
  }
}
