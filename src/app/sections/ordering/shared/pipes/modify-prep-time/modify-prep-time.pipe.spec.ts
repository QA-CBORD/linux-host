import { TestBed } from '@angular/core/testing';
import { MerchantOrderTypesInfo } from '@sections/ordering';
import { CartService } from '@sections/ordering/services';
import { ModifyPrepTimePipe } from './modify-prep-time.pipe';

describe('ModifyPrepTimePipe', () => {
  let pipe: ModifyPrepTimePipe;

  beforeEach(() => {
    const cartServiceStub = () => ({
      extractTimeZonedString: (arg, merchantTimeZone, showFullDate) => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        ModifyPrepTimePipe,
        { provide: CartService, useFactory: cartServiceStub }
      ]
    });
    pipe = TestBed.inject(ModifyPrepTimePipe);
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
