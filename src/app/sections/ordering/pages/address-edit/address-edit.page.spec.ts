import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { PopoverController } from '@ionic/angular';
import { MerchantService } from '@sections/ordering';
import { AddressEditPage } from '.';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Location } from '@angular/common';
import { OrderingService } from '@sections/ordering/services/ordering.service';

describe('AddressEditPage', () => {
  let component: AddressEditPage;
  let fixture: ComponentFixture<AddressEditPage>;

  let router;
  let merchantService;
  let loadingService;
  let popoverCtrl;
  let settingsFacadeService;
  let location;
  let orderingService;
  let route;

  beforeEach(
    waitForAsync(() => {
      
      orderingService = {
        getContentStringByName: jest.fn(),
      };

      TestBed.configureTestingModule({
        declarations: [AddressEditPage],
        providers: [
          { provide: MerchantService, useValue: merchantService },
          { provide: Router, useValue: router },
          { provide: LoadingService, useValue: loadingService },
          { provide: PopoverController, useValue: popoverCtrl },
          { provide: SettingsFacadeService, useValue: settingsFacadeService },
          { provide: Location, useValue: location },
          { provide: OrderingService, useValue: orderingService },
          { provide: ActivatedRoute, useValue: route }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();

      component = new AddressEditPage(
        router,
        merchantService,
        loadingService,
        popoverCtrl,
        orderingService,
        settingsFacadeService,
        location,
        route
      );
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create AddressEditPage component', () => {
    expect(component).toBeTruthy();
  });
});
