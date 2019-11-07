import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING } from '@sections/ordering/ordering.config';
import { CartService } from '@sections/ordering/services';
import { zip } from 'rxjs';
import { take } from 'rxjs/operators';
import { MenuCategoryInfo, MenuCategoryItemInfo } from '@sections/ordering/shared/models';

@Component({
  selector: 'st-menu-category-items',
  templateUrl: './menu-category-items.component.html',
  styleUrls: ['./menu-category-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuCategoryItemsComponent implements OnInit {
  searchState: boolean = false;
  menuCategory: MenuCategoryInfo;
  filteredMenuCategoryItems: MenuCategoryItemInfo[] = [];

  constructor(
    private router: Router,
    private readonly cartService: CartService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ionViewWillEnter() {
    this.cartService.menuItems$.subscribe(items => console.log(items));
  }

  ngOnInit() {
    zip(this.cartService.menuInfo$, this.activatedRoute.params)
      .pipe(take(1))
      .subscribe(([menu, { id }]) => {
        const menuCategory = menu.menuCategories.find(category => category.id === id);

        this.menuCategory = menuCategory;
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
    this.activatedRoute.params.pipe(take(1)).subscribe(({ id }) => {
      this.router.navigate([NAVIGATE.ordering, LOCAL_ROUTING.itemDetail], {
        skipLocationChange: true,
        queryParams: { categoryId: id, menuItemId },
      });
    });
  }
}
