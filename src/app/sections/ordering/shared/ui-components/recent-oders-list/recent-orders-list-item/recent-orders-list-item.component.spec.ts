import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { OrderCheckinStatus } from '@sections/check-in/OrderCheckinStatus';
import { RecentOrdersListItemComponent } from './recent-orders-list-item.component';

describe('RecentOrdersListItemComponent', () => {
  let component: RecentOrdersListItemComponent;
  let fixture: ComponentFixture<RecentOrdersListItemComponent>;

  beforeEach(() => {
    const orderingServiceStub = () => ({
      getContentStringByName: labelOrder => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecentOrdersListItemComponent],
      providers: [{ provide: OrderingService, useFactory: orderingServiceStub }]
    });
    fixture = TestBed.createComponent(RecentOrdersListItemComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`orderCheckStatus has default value`, () => {
    expect(component.orderCheckStatus).toEqual(OrderCheckinStatus);
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
