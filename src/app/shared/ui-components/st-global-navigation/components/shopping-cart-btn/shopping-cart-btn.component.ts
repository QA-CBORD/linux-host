import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CartService } from '@sections/ordering';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule],
  selector: 'st-shopping-cart-btn',
  templateUrl: './shopping-cart-btn.component.html',
  styleUrls: ['././shopping-cart-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartBtnComponent {
  constructor(private readonly cartService: CartService) {}

  get itemsCount(): Observable<number> {
    return this.cartService.menuItems$;
  }
}
