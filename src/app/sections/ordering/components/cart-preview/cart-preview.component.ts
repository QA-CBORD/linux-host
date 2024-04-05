import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { CartService } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { OrderItemDetailsModule } from '@sections/ordering/shared/ui-components/order-item-details/order-item-details.module';
import { NavigationService } from '@shared/services';
import { StButtonModule, StHeaderModule } from '@shared/ui-components';
import { PATRON_NAVIGATION } from 'src/app/app.global';
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
    StButtonModule,
  ],
})
export class CartPreviewComponent {
  private readonly modalService = inject(ModalsService);
  private readonly cartService = inject(CartService);
  private readonly orderingService = inject(OrderingService);
  private readonly router = inject(NavigationService);
  isCartPreiew: boolean = true;

  onClose = () => {
    this.modalService.dismiss();
  };

  redirectToCart = () => {
    this.orderingService.redirectToCart(this.isCartPreiew);
  };

  async addMoreItems() {
      const routed = await this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.fullMenu], {
        queryParams: { isExistingOrder: true },
      });
      if (routed) {
        this.onClose();
      }
  }

  get orderInfo$() {
    return this.cartService.orderInfo$;
  }

  get merchant$() {
    return this.cartService.merchant$;
  }
}
