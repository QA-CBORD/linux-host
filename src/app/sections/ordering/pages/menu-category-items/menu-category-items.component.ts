import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LOCAL_ROUTING, ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { CartService } from '@sections/ordering/services';
import { Observable, zip } from 'rxjs';
import { take, distinctUntilChanged, filter } from 'rxjs/operators';
import { MenuCategoryInfo, MenuCategoryItemInfo, MenuInfo } from '@sections/ordering/shared/models';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { NavigationService } from '@shared/services/navigation.service';
import { APP_ROUTES } from '@sections/section.config';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

@Component({
  selector: 'st-menu-category-items',
  templateUrl: './menu-category-items.component.html',
  styleUrls: ['./menu-category-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCategoryItemsComponent implements OnInit {
  searchState = false;
  menuInfo$: Observable<MenuInfo>;
  menuCategory: MenuCategoryInfo;
  filteredMenuCategoryItems: MenuCategoryItemInfo[] = [];
  menuItems$: Observable<number>;
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};
  isGuestUser: boolean;
  isExistingOrder: boolean;

  constructor(
    private readonly cartService: CartService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef,
    private readonly orderingService: OrderingService,
    private readonly navService: NavigationService,
    private readonly a11yService: AccessibilityService
  ) {}

  ionViewWillEnter() {
    this.initContentStrings();
    this.cdRef.detectChanges();
    const { isExistingOrder = false } = this.activatedRoute.snapshot.queryParams;
    this.isExistingOrder = JSON.parse(isExistingOrder);
  }

  ngOnInit() {
    this.menuInfo$ = this.cartService.menuInfo$;
    this.menuItems$ = this.cartService.menuItems$.pipe(
      // If is not first emission from an empty cart
      filter((val, index) => !!val || index > 1),
      distinctUntilChanged()
    );
    zip(this.cartService.menuInfo$, this.activatedRoute.params)
      .pipe(take(1))
      .subscribe(([menu, { id }]) => {
        this.menuCategory = menu?.menuCategories?.find(category => category.id === id);
      });
  }

  onBackBtnClicked() {
    this.navService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.fullMenu]);
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
    this.a11yService.excuteSearchSpeech(this.filteredMenuCategoryItems);
  }

  onCancelClicked() {
    this.searchState = !this.searchState;
    this.filteredMenuCategoryItems = [];
  }

  triggerMenuItemClick(menuItemId) {
    this.navService.navigate([APP_ROUTES.ordering, LOCAL_ROUTING.itemDetail], {
      queryParams: { menuItemId, isExistingOrder: this.isExistingOrder },
    });
  }

  async redirectToCart() {
    this.orderingService.redirectToCart();
  }

  private initContentStrings() {
    this.contentStrings.labelSearch = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelSearch);
    this.contentStrings.labelEmptySearch = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelEmptySearch
    );
    this.contentStrings.labelFullMenu = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.labelFullMenu
    );
    this.contentStrings.searchesAvailable = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.searchesAvailable
    );
    this.contentStrings.oneSearchAvailable = this.orderingService.getContentStringByName(
      ORDERING_CONTENT_STRINGS.oneSearchAvailable
    );
  }
}
