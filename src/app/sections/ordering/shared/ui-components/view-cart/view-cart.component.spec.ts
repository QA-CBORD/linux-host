import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { ViewCartComponent } from './view-cart.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('ViewCartComponent', () => {
  let component: ViewCartComponent;
  let fixture: ComponentFixture<ViewCartComponent>;
  
  const translateService = {
    instant: jest.fn(),
  };

  beforeEach(() => {
    const orderingServiceStub = () => ({
      getContentStringByName: buttonViewCart => ({}),
    });
    TestBed.configureTestingModule({
      imports: [TranslateModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ViewCartComponent],
      providers: [
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: TranslateService, useValue: translateService },
      ],
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

  it('makes expected calls', () => {
    const orderingServiceStub: OrderingService = fixture.debugElement.injector.get(OrderingService);
    jest.spyOn(orderingServiceStub, 'getContentStringByName');
    component.ngOnInit();
    expect(orderingServiceStub.getContentStringByName).toHaveBeenCalled();
  });

  it('should not validate current value', () => {  
    const simpleChangesStub: SimpleChanges = <SimpleChanges>{};
    simpleChangesStub.menuItemsCount = <any>{};
    simpleChangesStub.menuItemsCount.currentValue = null;
    component.ngOnChanges(simpleChangesStub);
  });

  it('should validate currentvalue', () => {
    const simpleChangesStub: SimpleChanges = <SimpleChanges>{};
    simpleChangesStub.menuItemsCount = <any>{};
    simpleChangesStub.menuItemsCount.currentValue = 10;
    component.ngOnChanges(simpleChangesStub);
  });
});
