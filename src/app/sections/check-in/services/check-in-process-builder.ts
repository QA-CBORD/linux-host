import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CHECKIN_ROUTES } from '../check-in-config';

@Injectable()
export class CheckingProcess {
  constructor(
    private readonly router: Router
  ) {}

  async start({ id: orderId, dueTime, orderPayment,  checkNumber, total, merchantId, type, pickupAddressId }, isExistingOrder = false) {
    await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.pending], {
      queryParams: {
        isExistingOrder,
        orderId,
        dueTime,
        type,
        checkNumber,
        orderPayment: JSON.stringify(orderPayment[0]),
        pickupAddressId,
        total,
        merchantId,
        path: this.router.url,
      },
    });
  }
}
