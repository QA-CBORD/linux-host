import { TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { OrderingService } from '@sections/ordering/services/ordering.service';
import { MerchantOrderTypesInfo } from '../../models/merchant-order-types-info.model';
import { OrderTypePipe } from './order-type.pipe';

describe('OrderTypePipe', () => {
  let pipe: OrderTypePipe;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    const orderingServiceStub = () => ({
      getContentStringByName: labelPickup => ({
        pipe: () => ({ toPromise: () => ({}) })
      })
    });
    TestBed.configureTestingModule({
      providers: [
        OrderTypePipe,
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub },
        { provide: OrderingService, useFactory: orderingServiceStub }
      ]
    });
    pipe = TestBed.inject(OrderTypePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    const args: string[] = [];
    expect(pipe.transform(value, args)).toEqual('Y');
  });
});
