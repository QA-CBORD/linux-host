import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ViewCartComponent } from './view-cart.component';

describe('ViewCartComponent', () => {
  let component: ViewCartComponent;
  let fixture: ComponentFixture<ViewCartComponent>;

  beforeEach(() => {
    const orderingServiceStub = () => ({
      getContentStringByName: buttonViewCart => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ViewCartComponent],
      providers: [{ provide: OrderingService, useFactory: orderingServiceStub }]
    });
    fixture = TestBed.createComponent(ViewCartComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`menuItemsCount has default value`, () => {
    expect(component.menuItemsCount).toEqual(0);
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
