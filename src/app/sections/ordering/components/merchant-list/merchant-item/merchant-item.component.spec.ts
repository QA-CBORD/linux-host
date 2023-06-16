import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MerchantInfo } from '@sections/ordering/shared/models';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { MerchantItemComponent } from './merchant-item.component';

describe('MerchantItemComponent', () => {
  let component: MerchantItemComponent;
  let fixture: ComponentFixture<MerchantItemComponent>;

  beforeEach(() => {
    const orderingServiceStub = () => ({
      getContentStringByName: labelClosed => ({})
    });
    const environmentFacadeServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MerchantItemComponent],
      providers: [
        { provide: OrderingService, useFactory: orderingServiceStub },
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(MerchantItemComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const orderingServiceStub: OrderingService = fixture.debugElement.injector.get(
        OrderingService
      );
     jest.spyOn(orderingServiceStub, 'getContentStringByName');
      component.ngOnInit();
      expect(orderingServiceStub.getContentStringByName).toHaveBeenCalled();
    });
  });
});
