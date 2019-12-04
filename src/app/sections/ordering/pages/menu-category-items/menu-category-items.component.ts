import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { CartService } from '@sections/ordering/services';
import { Observable, zip } from 'rxjs';
import { take } from 'rxjs/operators';
import { MenuCategoryInfo, MenuCategoryItemInfo, MenuInfo } from '@sections/ordering/shared/models';

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

  constructor(
    private readonly router: Router,
    private readonly cartService: CartService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ionViewWillEnter() {
    this.menuItems$ = this.cartService.menuItems$;
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
    this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.fullMenu], { skipLocationChange: true });
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
    this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.itemDetail], {
      skipLocationChange: true,
      queryParams: { menuItemId },
    });
  }
}
