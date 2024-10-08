import { inject, Injectable } from '@angular/core';
import { SessionFacadeService } from '../session/session.facade.service';
import { CartService } from '@sections/ordering';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private readonly sessionFacadeService = inject(SessionFacadeService);
  private readonly cartService = inject(CartService);

  logout() {
    this.sessionFacadeService.logoutUser();
    this.cartService.clearCart();
  }
}
