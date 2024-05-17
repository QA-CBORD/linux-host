import { Injectable } from '@angular/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import {
  LOCAL_ROUTING,
  ORDERING_CONTENT_STRINGS,
  ORDER_ERROR_CODES,
  ORDER_TYPE,
  ORDER_VALIDATION_ERRORS,
} from '@sections/ordering/ordering.config';
import { Observable, lastValueFrom } from 'rxjs';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS } from '../../../content-strings';
import { first, map, take } from 'rxjs/operators';
import { ContentStringInfo } from '@core/model/content/content-string-info.model';
import { LoadingService } from '@core/service/loading/loading.service';
import { handleServerError } from '@core/utils/general-helpers';
import { APP_ROUTES } from '@sections/section.config';
import { ToastService } from '@core/service/toast/toast.service';
import { CartService } from './cart.service';
import { AlertController } from '@ionic/angular';
import { NavigationService } from '@shared/services';
import { ModalsService } from '@core/service/modals/modals.service';
import { TranslateService } from '@ngx-translate/core';
import { AddressInfo } from '@core/model/address/address-info';

@Injectable({
  providedIn: 'root',
})
export class OrderingService {
  constructor(
    private readonly contentStringsFacadeService: ContentStringsFacadeService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly cartService: CartService,
    private readonly alertController: AlertController,
    private readonly routingService: NavigationService,
    private readonly modalService: ModalsService,
    private readonly translateService: TranslateService
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
    if (this.cartService.cartsErrorMessage !== null) {
      return this.presentPopup(this.cartService.cartsErrorMessage);
    }
    const successCb = () =>
      this.routingService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.cart], {
        queryParams: { isExistingOrder: this.cartService.isExistingOrder, isFromCartPreview: fromCartPreview },
      });
    const errorCB = (error: Array<string> | string) => {
      if (Array.isArray(error)) {
        const [code, message] = error;
        if (IGNORE_ERRORS.includes(code)) return this.presentPopup(message);
        error = message;
      }
      return this.failedValidateOrder(error);
    };
    await this.validateOrder(successCb, errorCB);
  }

  private async failedValidateOrder(message: string): Promise<void> {
    await this.toastService.showToast({ message });
  }

  async validateOrder(successCb, errorCB, ignoreCodes: string[] = IGNORE_ERRORS): Promise<void> {
    await this.loadingService.showSpinner();
    await lastValueFrom(
      this.cartService
        .validateOrder({
          dueTime: new Date('2024-05-15T20:35:20.734'),
          isASAP: false,
          orderType: ORDER_TYPE.DELIVERY,
          address: {} as AddressInfo,
        })
        .pipe(first(), handleServerError(ORDER_VALIDATION_ERRORS, ignoreCodes))
    )
      .then(() => {
        this.cartService.cartsErrorMessage = null;
        return successCb && successCb();
      })
      .catch((error: Array<string> | string) => {
        if (Array.isArray(error) && IGNORE_ERRORS.includes(error[0])) {
          this.cartService.cartsErrorMessage = error[1];
        }
        return errorCB(error);
      })
      .finally(() => {
        this.loadingService.closeSpinner();
        this.modalService.dismiss();
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
];
