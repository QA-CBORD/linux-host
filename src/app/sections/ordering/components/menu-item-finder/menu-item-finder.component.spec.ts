import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { ToastService } from '@core/service/toast/toast.service';
import { CartService } from '@sections/ordering';
import { CommonService } from '@shared/services/common.service';
import { MenuItemFinderComponent } from './menu-item-finder.component';

describe('MenuItemFinderComponent', () => {
  let component: MenuItemFinderComponent;
  let fixture: ComponentFixture<MenuItemFinderComponent>;

  beforeEach(() => {
    const modalsServiceStub = () => ({
      create: object => ({
        onDidDismiss: () => ({ then: () => ({}) }),
        present: () => ({})
      })
    });
    const toastServiceStub = () => ({ showToast: object => ({}) });
    const cartServiceStub = () => ({
      merchant$: { pipe: () => ({}) },
      getMenuItemByCode: scanCodeResult => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    const commonServiceStub = () => ({
      loadContentString: scanAndGo => ({
        pipe: () => ({ subscribe: f => f({}) })
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MenuItemFinderComponent],
      providers: [
        { provide: ModalsService, useFactory: modalsServiceStub },
        { provide: ToastService, useFactory: toastServiceStub },
        { provide: CartService, useFactory: cartServiceStub },
        { provide: CommonService, useFactory: commonServiceStub }
      ]
    });
    fixture = TestBed.createComponent(MenuItemFinderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
