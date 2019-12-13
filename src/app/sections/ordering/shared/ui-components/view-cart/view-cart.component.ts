import { Component, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCartComponent implements OnChanges {
  @Input() menuItemsCount: number = 0;
  constructor() { }

  ngOnChanges(changes) {
    if (changes.menuItemsCount.currentValue !== null) {
      console.log(changes.menuItemsCount.currentValue);
      this.menuItemsCount = changes.menuItemsCount.currentValue;
    }
  }

  // async redirectToCart() {
  //   this.loadingService.showSpinner();
  //   await this.cartService
  //     .validateOrder()
  //     .pipe(
  //       first(),
  //       handleServerError(ORDER_VALIDATION_ERRORS)
  //     )
  //     .toPromise()
  //     .then(() => this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.cart], { skipLocationChange: true }))
  //     .catch(error => {
  //       // this.cartService.removeLastOrderItem();
  //       this.failedValidateOrder(error)
  //     })
  //     .finally(() => this.loadingService.closeSpinner());
  //   // this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.cart], { skipLocationChange: true });
  // }

  // private async failedValidateOrder(message: string) {
  //   const toast = await this.toastController.create({
  //     message,
  //     duration: 3000,
  //     position: 'top',
  //   });
  //   toast.present();
  // }
}
