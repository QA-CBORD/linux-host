import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '@sections/ordering/services';
import { OrderInfo, OrderItem } from '@sections/ordering/shared';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { OrderItemDetailsModule } from '@sections/ordering/shared/ui-components/order-item-details/order-item-details.module';
import { StHeaderModule } from '@shared/ui-components';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  providers: [PriceUnitsResolverPipe],
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.scss',
  imports: [
    IonicModule,
    StHeaderModule,
    TranslateModule,
    PriceUnitsResolverModule,
    OrderItemDetailsModule,
    IonicModule,
    CommonModule,
  ],
})
export class CartPreviewComponent {
  private readonly modalService = inject(ModalsService);
  private readonly cartService = inject(CartService);

  orderItems: OrderItem[] = [];
  mealBased: boolean;
  merchantName: string;

  onClose = () => {
    this.modalService.dismiss();
  };

  ngOnInit(): void {
    // this.cartService.orderInfo$.subscribe((orderInfo: OrderInfo) => {
    //   this.merchantName = orderInfo.merchantName;
    // });
    this.merchantName = 'Breaskfast Express';
    this.mealBased = false;
    let p: OrderItem = {
      id: '1',
      orderId: '2',
      menuItemId: '3',
      parentOrderItemId: '5',
      quantity: 4,
      displayRank: 5,
      salePrice: 10,
      specialInstructions: '',
      keyedName: 'Orange Juice',
      status: 1,
      name: 'Orange Juice',
      reportingCategory: '',
      optionType: '',
      orderItemOptions: [{
        id: '1',
        orderId: '2',
        menuItemId: '3',
        parentOrderItemId: '5',
        quantity: 4,
        displayRank: 5,
        salePrice: 10,
        specialInstructions: '',
        keyedName: 'Oranges',
        status: 1,
        name: 'Oranges',
        reportingCategory: '',
        optionType: '',
        orderItemOptions: [],
      }],
    };

    this.orderItems = [p, p, p, p, p];
  }
}
