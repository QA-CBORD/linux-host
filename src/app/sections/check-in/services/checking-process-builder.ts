import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { CHECKIN_ROUTES } from '../check-in-config';

@Injectable()
export class CheckingProcess {
  constructor(
    private readonly router: Router
  ) {}

  async start(
    { id: orderId, dueTime, checkNumber, total, merchantId, mealBased },
    orderNew = false
  ) {
    await this.router.navigate([PATRON_NAVIGATION.ordering, CHECKIN_ROUTES.pending], {
      queryParams: {
        orderNew,
        orderId,
        dueTime,
        checkNumber,
        mealBased,
        total,
        merchantId,
      }
    });
  }
}
