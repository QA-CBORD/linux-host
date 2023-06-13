import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { NavigationService } from '@shared/services/navigation.service';
import { NonCheckingService } from '../../services/non-checking.service';
import { NonCheckingSuccessComponent } from './non-checking-success.component';

describe('NonCheckingSuccessComponent', () => {
  let component: NonCheckingSuccessComponent;
  let fixture: ComponentFixture<NonCheckingSuccessComponent>;

  beforeEach(() => {
    const orderingServiceStub = () => ({
      getContentStringByName: buttonDone => ({})
    });
    const navigationServiceStub = () => ({ navigate: array => ({}) });
    const nonCheckingServiceStub = () => ({ summary$: {} });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NonCheckingSuccessComponent],
      providers: [
        { provide: OrderingService, useFactory: orderingServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub },
        { provide: NonCheckingService, useFactory: nonCheckingServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NonCheckingSuccessComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onClosed', () => {
    it('makes expected calls', () => {
      const navigationServiceStub: NavigationService = fixture.debugElement.injector.get(
        NavigationService
      );
      spyOn(navigationServiceStub, 'navigate').and.callThrough();
      component.onClosed();
      expect(navigationServiceStub.navigate).toHaveBeenCalled();
    });
  });
});
