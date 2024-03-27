import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDetailComponent } from './item-detail.component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { ToastService } from '@core/service/toast/toast.service';
import { PopoverController } from '@ionic/angular';
import { CartService } from '@sections/ordering/services';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { NavigationService } from '@shared/index';
import { PriceUnitsResolverModule } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.module';
import { PriceUnitsResolverPipe } from '@sections/ordering/shared/pipes/price-units-resolver/price-units-resolver.pipe';
import { CurrencyPipe } from '@angular/common';
import { of } from 'rxjs';

describe('ItemDetailComponent', () => {
  let component: ItemDetailComponent;
  let fixture: ComponentFixture<ItemDetailComponent>;
  const mockEnvironmentFacadeService = {
    // Add mock methods or properties as needed
  };

  const mockFormBuilder = {
    // Add mock methods or properties as needed
  };

  const mockActivatedRoute = {
    // Add mock methods or properties as needed
  };

  const mockCartService = {
    // Add mock methods or properties as needed
  };

  const mockLoadingService = {
    // Add mock methods or properties as needed
  };

  const mockToastService = {
    // Add mock methods or properties as needed
  };

  const mockOrderingService = {
    getContentStringByName: jest.fn().mockReturnValue(of('')),
  };

  const mockPopoverController = {
    // Add mock methods or properties as needed
  };

  const mockNavigationService = {
    // Add mock methods or properties as needed
  };

  const mockChangeDetectorRef = {
    // Add mock methods or properties as needed
  };

  let pipe: PriceUnitsResolverPipe;
  let currencyPipeStub: CurrencyPipe;

  beforeEach(async () => {
     TestBed.configureTestingModule({
      declarations: [ItemDetailComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [PriceUnitsResolverModule],
      providers: [
        PriceUnitsResolverPipe,
        CurrencyPipe,
        { provide: EnvironmentFacadeService, useValue: mockEnvironmentFacadeService },
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: CartService, useValue: mockCartService },
        { provide: LoadingService, useValue: mockLoadingService },
        { provide: ToastService, useValue: mockToastService },
        { provide: OrderingService, useValue: mockOrderingService },
        { provide: PopoverController, useValue: mockPopoverController },
        { provide: NavigationService, useValue: mockNavigationService },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
      ],
    });
    fixture = TestBed.createComponent(ItemDetailComponent);
    pipe = TestBed.inject(PriceUnitsResolverPipe);
    currencyPipeStub = TestBed.inject(CurrencyPipe);
    fixture.detectChanges()
  });

  describe('method1', () => {
    it('should ...', () => {
      expect(component).toBeTruthy();
    });
  });
});
