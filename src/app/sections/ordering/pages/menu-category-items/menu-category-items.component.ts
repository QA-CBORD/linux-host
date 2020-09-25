import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { LOCAL_ROUTING, ORDER_VALIDATION_ERRORS, ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { CartService } from '@sections/ordering/services';
import { Observable, zip } from 'rxjs';
import { take, first } from 'rxjs/operators';
import { MenuCategoryInfo, MenuCategoryItemInfo, MenuInfo } from '@sections/ordering/shared/models';
import { handleServerError } from '@core/utils/general-helpers';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '@core/service/loading/loading.service';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-menu-category-items',
  templateUrl: './menu-category-items.component.html',
  styleUrls: ['./menu-category-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCategoryItemsComponent implements OnInit {
  searchState: boolean = false;
  menuInfo$: Observable<MenuInfo>;
  menuCategory: MenuCategoryInfo;
  filteredMenuCategoryItems: MenuCategoryItemInfo[] = [];
  menuItems$: Observable<number>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
    private readonly orderingService: OrderingService,
    private readonly alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.menuItems$ = this.cartService.menuItems$;
    this.initContentStrings();
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.menuInfo$ = this.cartService.menuInfo$;

    zip(this.cartService.menuInfo$, this.activatedRoute.params)
      .pipe(take(1))
      .subscribe(([menu, { id }]) => {
        this.menuCategory = menu.menuCategories.find(category => category.id === id);
      });
  }

  onBackBtnClicked() {
    this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.fullMenu]);
  }

  onSearchClick() {
    this.searchState = !this.searchState;
  }

  onSearchItemFiltered({ target }) {
    const value = target.value.trim().toLowerCase();

    if (!value) return (this.filteredMenuCategoryItems = []);
    this.filteredMenuCategoryItems = this.menuCategory.menuCategoryItems.filter(
      ({ menuItem: { name, description } }) => {
        return name.toLowerCase().indexOf(value) > -1 || (description && description.toLowerCase().indexOf(value) > -1);
      }
    );
  }

  onCancelClicked() {
    this.searchState = !this.searchState;
    this.filteredMenuCategoryItems = [];
  }

  triggerMenuItemClick(menuItemId) {
    this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.itemDetail], {
      queryParams: { menuItemId },
    });
  }

  async redirectToCart() {
    if (this.cartService.cartsErrorMessage !== null) {
      this.presentPopup(this.cartService.cartsErrorMessage);
      return;
    }

    await this.loadingService.showSpinner();
    await this.cartService
      .validateOrder()
      .pipe(
        first(),
        handleServerError(ORDER_VALIDATION_ERRORS)
      )
      .toPromise()
      .then(() => this.router.navigate([PATRON_NAVIGATION.ordering, LOCAL_ROUTING.cart]))
      .catch(error => this.failedValidateOrder(error))
      .finally(() => this.loadingService.closeSpinner());
  }

  private async presentPopup(message) {
    const alert = await this.alertController.create({
      header: message,
      buttons: [{ text: 'Ok' }],
    });

    await alert.present();
  }

  private async failedValidateOrder(message: string): Promise<void> {
    await this.toastService.showToast({ message });
  }

  private initContentStrings() {
    this.contentStrings.labelSearch = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelSearch);
    this.contentStrings.labelEmptySearch = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelEmptySearch
    );
    this.contentStrings.labelFullMenu = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelFullMenu
    );
  }
}
