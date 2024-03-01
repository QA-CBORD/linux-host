import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { CartService } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { NavigationService } from '@shared/services';
import { MenuCategoryItemsComponent } from './menu-category-items.component';
import { of } from 'rxjs';
import { MenuInfo } from '@sections/ordering/components';
import { Params } from '@angular/router';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';

describe('MenuCategoryItemsComponent', () => {
  let component: MenuCategoryItemsComponent;
  let fixture: ComponentFixture<MenuCategoryItemsComponent>;
  let searchbar: DebugElement;

  let cartService;
  let activatedRoute;
  let loadingService;
  let toastService;
  let orderingService;
  let alertController;
  let navService;
  let a11yService

  beforeEach(async () => {
    cartService = {
      menuInfo$: of({menuCategories: [{ id: '1', name: 'test' }]} as MenuInfo),
      menuItems$: of(1),
    };

    activatedRoute = {
      params: of({ id: '1' } as Params),
    };

    await TestBed.configureTestingModule({
      declarations: [MenuCategoryItemsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: CartService, useValue: cartService },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: LoadingService, useValue: loadingService },
        { provide: ToastService, useValue: toastService },
        { provide: OrderingService, useValue: orderingService },
        { provide: AlertController, useValue: alertController },
        { provide: NavigationService, useValue: navService },
        {provide: AccessibilityService, useValue: a11yService}
      ],
      imports: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCategoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Wait for ion-searchbar to render
    fixture.whenStable().then(() => {
      searchbar = fixture.debugElement.query(By.directive(IonSearchbar));
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSearchedValue when ionInput event is triggered', () => {
    const inputValue = 'example search';
    jest.spyOn(component, 'onSearchItemFiltered');

    fixture.whenStable().then(() => {
      searchbar.triggerEventHandler('ionInput', {
        detail: {
          value: inputValue,
        },
      });
      fixture.detectChanges();

      expect(component.onSearchItemFiltered).toHaveBeenCalledWith(inputValue);
    });
  });
});
