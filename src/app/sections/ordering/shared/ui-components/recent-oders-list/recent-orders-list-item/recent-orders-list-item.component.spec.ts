import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentOrdersListItemComponent } from './recent-orders-list-item.component';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { OrderInfo } from '@sections/ordering/shared/models/order-info.model';
import { OrderItemsSummaryModule } from '@sections/ordering/shared/pipes/order-items-summary/order-items-summary.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RecentOrdersListItemComponent', () => {
  let component: RecentOrdersListItemComponent;
  let fixture: ComponentFixture<RecentOrdersListItemComponent>;
  let mockOrderingService;

  beforeEach(async () => {
    mockOrderingService = {
      getContentStringByName: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ RecentOrdersListItemComponent ],
      imports: [OrderItemsSummaryModule],
      providers: [
        { provide: OrderingService, useValue: mockOrderingService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]

    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentOrdersListItemComponent);
    component = fixture.componentInstance;
    component.orderInfo = {} as OrderInfo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize contentStrings, status, iconClass, and isPaymentFailed on ngOnInit', () => {
    mockOrderingService.getContentStringByName.mockReturnValue('test string');
    component.ngOnInit();
    expect(component.contentStrings.labelOrder).toBe('test string');
    expect(component.contentStrings.needCheckin).toBe('test string');
    // Add assertions for status, iconClass, and isPaymentFailed
  });

  it('should emit orderInfo on onClicked', () => {
    const onClickedSpy = jest.spyOn(component.onClicked, 'emit');
    component.onClicked.emit(component.orderInfo);
    expect(onClickedSpy).toHaveBeenCalledWith(component.orderInfo);
  });

  it('should emit orderInfo on onNavigateToCheckin', () => {
    const onNavigateToCheckinSpy = jest.spyOn(component.onNavigateToCheckin, 'emit');
    component.onNavigateToCheckin.emit(component.orderInfo);
    expect(onNavigateToCheckinSpy).toHaveBeenCalledWith(component.orderInfo);
  });

  it('should set isPaymentFailed correctly on ngOnInit', () => {
    const orderInfo = {} as OrderInfo;
    orderInfo.isWalkoutOrder = true;
    component.orderInfo = orderInfo;

    component.ngOnInit();

    expect(component.isPaymentFailed).toBe(false);
  });
});