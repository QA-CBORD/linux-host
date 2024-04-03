import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { OrderItem } from '@sections/ordering/shared';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { OrderItemDetailsModule } from '@sections/ordering/shared/ui-components/order-item-details/order-item-details.module';
import { StHeaderModule } from '@shared/ui-components';
import { first, lastValueFrom } from 'rxjs';
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
export class CartPreviewComponent implements OnInit {
  private readonly modalService = inject(ModalsService);
  private readonly cartService = inject(CartService);
  private readonly orderingService = inject(OrderingService);

  orderItems: OrderItem[] = [];
  mealBased: boolean;
  merchantName: string;
  isCartPreiew = true;

  onClose = () => {
    this.modalService.dismiss();
  };

  async ngOnInit(): Promise<void> {
    const { orderItems, mealBased } = await lastValueFrom(this.cartService.orderInfo$.pipe(first()));
    const { name } = await lastValueFrom(this.cartService.merchant$.pipe(first()));
    this.orderItems = orderItems;
    this.mealBased = mealBased;
    this.merchantName = name;
  }

  redirectToCart = () => {
    this.orderingService.redirectToCart(this.isCartPreiew);
  };
}
