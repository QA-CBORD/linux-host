import { Injectable, inject } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import {
  LOCAL_ROUTING,
  ORDERING_CONTENT_STRINGS,
  ORDER_ERROR_CODES,
  ORDER_VALIDATION_ERRORS,
  TOAST_MESSAGES,
} from '@sections/ordering/ordering.config';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { map, take } from 'rxjs/operators';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { handleServerError } from '@core/utils/general-helpers';
import { APP_ROUTES } from '@sections/section.config';
import { ToastService } from '@core/service/toast/toast.service';
import { CartService } from './cart.service';
import { AlertController } from '@ionic/angular';
import { NavigationService } from '@shared/services';
import { ModalsService } from '@core/service/modals/modals.service';
import { TranslateFacadeService } from '@core/facades/translate/translate.facade.service';

@Injectable({
  providedIn: 'root',
})
export class OrderingService {
  private readonly translateService = inject(TranslateFacadeService);
  constructor(
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly cartService: CartService,
    private readonly alertController: AlertController,
    private readonly routingService: NavigationService,
    private readonly modalService: ModalsService
  ) {}

  getContentStringByName(name: ORDERING_CONTENT_STRINGS): Observable<string> {
    return this.contentStringsFacadeService
      .getContentString$(CONTENT_STRINGS_DOMAINS.patronUi, CONTENT_STRINGS_CATEGORIES.ordering, name)
      .pipe(map((string: ContentStringInfo) => (string ? string.value : '')));
  }

  getContentErrorStringByName(name: ORDERING_CONTENT_STRINGS): Observable<string> {
    return this.contentStringsFacadeService
      .resolveContentString$(CONTENT_STRINGS_DOMAINS.get_common, CONTENT_STRINGS_CATEGORIES.error, name)
      .pipe(map((string: ContentStringInfo) => (string ? string.value : '')));
  }

  async getContentErrorStringByException(err: string | [string, string], defaultMessage: string): Promise<string> {
    const errorMessage = Array.isArray(err) ? err[0] : err;

    if (err && err.includes('CONTENT_STRING')) {
      const contentStringKey: ORDERING_CONTENT_STRINGS = errorMessage.split(
        'CONTENT_STRING:'
      )[1] as ORDERING_CONTENT_STRINGS;
      const message = await lastValueFrom(this.getContentErrorStringByName(contentStringKey).pipe(take(1)));
      return message;
    }

    return errorMessage || defaultMessage;
  }

  async redirectToCart(fromCartPreview?: boolean): Promise<void> {
    await this.cartService.updateMerchantSettings();
    if (this.cartService.cartsErrorMessage !== null) {
      return this.presentPopup(this.cartService.cartsErrorMessage);
    }
    const successCb = (isAutoAsapSelection: boolean) => {
      this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.cart], {
        queryParams: { isExistingOrder: this.cartService.isExistingOrder, isFromCartPreview: fromCartPreview, isAutoAsapSelection: isAutoAsapSelection },
      });
      if (fromCartPreview) this.modalService.dismiss();
    };
    const errorCB = (error: Array<string> | string) => {
      if (Array.isArray(error)) {
        const [code, message] = error;
        if (IGNORE_ERRORS.includes(code)) return this.presentPopup(message);
        error = message;
      }
      return this.failedValidateOrder(error);
    };
    await this.validateOrder(successCb, errorCB, fromCartPreview ? IGNORE_ERRORS_FOR_ACTIVE_CART : null);
  }

  private async failedValidateOrder(message: string): Promise<void> {
    await this.toastService.showToast({ message });
  }

  async validateOrder(successCb, errorCB, ignoreCodes?: string[]): Promise<void> {
    await this.loadingService.showSpinner();
    await firstValueFrom(this.cartService.validateOrder(null, this.cartService._orderOption.isASAP).pipe(handleServerError(ORDER_VALIDATION_ERRORS, ignoreCodes)))
      .then((order) => {
        this.cartService.cartsErrorMessage = null;
        return successCb && successCb(order.isAutoAsapSelection);
      })
      .catch((error: Array<string> | string) => {
        if (Array.isArray(error) && IGNORE_ERRORS.includes(error[0])) {
          this.cartService.cartsErrorMessage = error[1];
        }
        if (TOAST_MESSAGES[error[0]]) error = this.translateService.instant(TOAST_MESSAGES[error[0]]);
        return errorCB(error);
      })
      .finally(() => {
        this.loadingService.closeSpinner();
      });
  }

  private async presentPopup(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: [{ text: 'Ok' }],
    });

    await alert.present();
  }
}

export type OrderingComponentContentStrings = {
  -readonly [key in keyof typeof ORDERING_CONTENT_STRINGS]: Observable<string>;
};

export const IGNORE_ERRORS = [
  ORDER_ERROR_CODES.ORDER_DELIVERY_ITEM_MIN,
  ORDER_ERROR_CODES.ORDER_ITEM_MIN,
  ORDER_ERROR_CODES.ORDER_ITEM_MAX,
  ORDER_ERROR_CODES.NOT_AVAILABLE_SLOTS
];

export const IGNORE_ERRORS_FOR_ACTIVE_CART = [ORDER_ERROR_CODES.ORDER_CAPACITY];
