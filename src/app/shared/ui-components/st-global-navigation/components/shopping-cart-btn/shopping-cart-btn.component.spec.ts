import { lastValueFrom, of } from 'rxjs';
import { CartService } from '@sections/ordering';
import { ShoppingCartBtnComponent } from './shopping-cart-btn.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingService } from '@core/service/loading/loading.service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_CATEGORIES } from 'src/app/content-strings';
import { TranslateModule } from '@ngx-translate/core';
import { LockDownService } from '@shared/services';
import { ActiveCartService } from '@sections/ordering/services/active-cart.service';

describe('ShoppingCartBtnComponent', () => {
  let component: ShoppingCartBtnComponent;
  let fixture: ComponentFixture<ShoppingCartBtnComponent>;

  const carService = {
    menuItems$: of(1),
  };
  const mockActiveCartService = {
    openCartpreview: jest.fn(),
  };
  const loadingService = {
    showSpinner: jest.fn(),
    closeSpinner: jest.fn(),
  };

  const lockDownService = { isLockDownOn: jest.fn(), loadStringsAndSettings: jest.fn().mockResolvedValue({}) };
  const contentStringsFacadeService = {
    fetchContentStrings$: jest.fn(() => of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingCartBtnComponent, TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: CartService, useValue: carService },
        { provide: LoadingService, useValue: loadingService },
        { provide: LockDownService, useValue: lockDownService },
        { provide: ContentStringsFacadeService, useValue: contentStringsFacadeService },
        { provide: ActiveCartService, useValue: mockActiveCartService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should get items count', async () => {
    const count = await lastValueFrom(component.itemsCount);
    fixture.detectChanges();
    expect(count).toEqual(1);
  });

  describe('openCart', () => {
    it('should call initContentStrings and openCartpreview', async () => {
      const initContentStringsSpy = jest
        .spyOn(component, 'initContentStrings')
        .mockImplementation(() => Promise.resolve());
      await component.openCart();
      expect(initContentStringsSpy).toHaveBeenCalled();
      expect(mockActiveCartService.openCartpreview).toHaveBeenCalled();
    });

    it('should not openCartpreview on lockdown', async () => {
      mockActiveCartService.openCartpreview.mockReset();
      lockDownService.isLockDownOn.mockReturnValueOnce(true);
      await component.openCart();
      expect(mockActiveCartService.openCartpreview).not.toHaveBeenCalled();
    });
  });

  describe('initContentStrings', () => {
    it('should call showSpinner, fetchContentStrings$, and closeSpinner', async () => {
      await component.initContentStrings();
      expect(loadingService.showSpinner).toHaveBeenCalled();
      expect(contentStringsFacadeService.fetchContentStrings$).toHaveBeenCalledWith(
        CONTENT_STRINGS_DOMAINS.patronUi,
        CONTENT_STRINGS_CATEGORIES.ordering
      );
      expect(loadingService.closeSpinner).toHaveBeenCalled();
    });
  });
});
