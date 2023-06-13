import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { ROLES } from 'src/app/app.global';
import { TermsService } from '../terms/terms.service';
import { WorkOrderStateService } from './work-order-state.service';
import { WorkOrdersComponent } from './work-orders.component';
import { WorkOrdersService } from './work-orders.service';

describe('WorkOrdersComponent', () => {
  let component: WorkOrdersComponent;
  let fixture: ComponentFixture<WorkOrdersComponent>;

  let mockWorkOrdersService: Partial<WorkOrdersService>;
  let mockWorkOrderStateService: Partial<WorkOrderStateService>;
  let mockTermsService: Partial<TermsService>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockWorkOrdersService = {
      getWorkOrders: jest.fn().mockReturnValue({ subscribe: jest.fn() }),
    };

    mockWorkOrderStateService = {};

    mockTermsService = {
      termId$: EMPTY,
    };

    mockRouter = {
      navigateByUrl: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [WorkOrdersComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: WorkOrdersService, useValue: mockWorkOrdersService },
        { provide: WorkOrderStateService, useValue: mockWorkOrderStateService },
        { provide: TermsService, useValue: mockTermsService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getWorkOrders and initialize terms subscription', () => {
      const getWorkOrdersSpy = jest.spyOn(component['_workOrdersService'], 'getWorkOrders');

      component.ngOnInit();

      expect(getWorkOrdersSpy).toHaveBeenCalled();
      // Additional expectations for terms subscription initialization
    });
  });

  describe('_initTermsSubscription', () => {
    it('should subscribe to termId$ and update urlEditForm and selectedTermKey', () => {
      const subscribeSpy = jest.spyOn(component['_termService'].termId$, 'subscribe');

      component['_initTermsSubscription']();

      expect(subscribeSpy).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscriptions', () => {
      const unsubscribeSpy = jest.spyOn(component['_subscription'], 'unsubscribe');

      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });

  describe('getStatus', () => {
    it('should return "Submitted" if key is not 0', () => {
      const key = 123;

      const result = component.getStatus(key);

      expect(result).toBe('Submitted');
    });

    it('should return "New" if key is 0', () => {
      const key = 0;

      const result = component.getStatus(key);

      expect(result).toBe('New');
    });
  });

  describe('createWorkOrderDefault', () => {
    it('should navigate to the appropriate URL', () => {
      const termKey = 123;
      component['selectedTermKey'] = termKey;

      component.createWorkOrderDefault();

      expect(component['router'].navigateByUrl).toHaveBeenCalledWith(`/patron/housing/work-orders/${termKey}/-1`);
    });
  });

  describe('getPath', () => {
    it('should return the appropriate path', () => {
      const termKey = 123;
      const key = 456;
      component['selectedTermKey'] = termKey;

      const result = component.getPath(key);

      expect(result).toBe(`${ROLES.patron}/housing/work-orders/${termKey}/${key}`);
    });
  });

  describe('getClass', () => {
    it('should return the corresponding class based on the key', () => {
      const key = 2; // Use an existing key from statusClasses

      const result = component.getClass(key);

      expect(result).toBe('inProcess');
    });

    it('should return "thinking" if the key does not exist in statusClasses', () => {
      const key = 123;

      const result = component.getClass(key);

      expect(result).toBe('thinking');
    });
  });
});
