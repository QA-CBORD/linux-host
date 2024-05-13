import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '@sections/ordering';
import { LockDownService } from '@shared/services';
import { Observable, lastValueFrom } from 'rxjs';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';

@Component({
  standalone: true,
  imports: [IonicModule, CommonModule, TranslateModule],
  selector: 'st-shopping-cart-btn',
  templateUrl: './shopping-cart-btn.component.html',
  styleUrls: ['././shopping-cart-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartBtnComponent {
  private readonly loadingService: LoadingService = inject(LoadingService);
  private readonly contentStringsFacadeService: ContentStringsFacadeService = inject(ContentStringsFacadeService);
  private readonly lockDownService = inject(LockDownService);
  constructor(private readonly cartService: CartService) {}

  get itemsCount(): Observable<number> {
    return this.cartService.menuItems$;
  }

  async openCart() {
    await this.initContentStrings();
    if (this.lockDownService.isLockDownOn()) {
      return;
    }
    this.cartService.openCartpreview();
  }
  async initContentStrings() {
    this.loadingService.showSpinner();
    await lastValueFrom(
      this.contentStringsFacadeService.fetchContentStrings$(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.ordering
      )
    );
    await this.lockDownService.loadStringsAndSettings();
    this.loadingService.closeSpinner();
  }
}
