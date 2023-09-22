import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RecentOrdersResolver } from '@sections/ordering/resolvers/recent-orders.resolver';
import { MerchantService } from '@sections/ordering/services';
import { of } from 'rxjs';
import { CheckInSuccessComponent } from './check-in-success.component';
import { HttpClientModule } from '@angular/common/http';
import { StorageStateService } from '@core/states/storage/storage-state.service';

describe('CheckInSuccessComponent', () => {
  let component: CheckInSuccessComponent;
  let fixture: ComponentFixture<CheckInSuccessComponent>;

  let router, merchantService, resolver, activatedRoute, storage, storageStateService;

  beforeEach(() => {
    router = {
      navigate: jest.fn(),
    };
    merchantService = {
      recentOrders$: of(null),
    };
    activatedRoute = {
      data: of({} as any),
      snapshot: {
        queryParams: {
          contentString: 'hello',
        },
      },
    };
    storage = {
      clear: jest.fn(),
      ready: jest.fn(),
      get: jest.fn(),
    };
    resolver = {
      resolver: jest.fn(),
    };
    storageStateService = {

    }

    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CheckInSuccessComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: MerchantService, useValue: merchantService },
        { provide: RecentOrdersResolver, useValue: resolver },
        { provide: Router, useValue: router },
        { provide: Storage, useValue: storage },
        { provide: StorageStateService, useValue: storageStateService },
      ],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(CheckInSuccessComponent);
    component = fixture.componentInstance;
  });

  it('should create a recent order component', () => {
    expect(component).toBeTruthy();
  });


  it('ngAfterViewInit should focus on modal-mainTitle', () => {
    component.checkNumber = '123';
    const focusSpy = jest.spyOn(document.getElementById('modal-mainTitle'), 'focus');
    component.ngAfterViewInit();
    expect(focusSpy).toHaveBeenCalled();
  });

  it('ngAfterViewChecked should focus on modal-mainTitle', () => {
    component.checkNumber = '123';
    const focusSpy = jest.spyOn(document.getElementById('modal-mainTitle'), 'focus');
    component.ngAfterViewChecked();
    expect(focusSpy).toHaveBeenCalled();
  });
  
  it('ngAfterContentChecked should focus on modal-mainTitle', () => {
    component.checkNumber = '123';
    const focusSpy = jest.spyOn(document.getElementById('modal-mainTitle'), 'focus');
    component.ngAfterContentChecked();
    expect(focusSpy).toHaveBeenCalled();
  });
});
