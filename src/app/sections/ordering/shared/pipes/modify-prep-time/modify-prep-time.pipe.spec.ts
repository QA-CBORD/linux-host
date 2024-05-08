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

  it('should return ASAP when isASAP is true and isShowTime is false', () => {
    const timeData = { dueTime: '2022-12-31', isASAP: true };
    const orderTypes: MerchantOrderTypesInfo = { merchantTimeZone: 'UTC' } as MerchantOrderTypesInfo;
    expect(pipe.transform(timeData, orderTypes, false)).toBe('ASAP');
  });

  it('should return empty string when timeData is null', () => {
    const timeData = null;
    const orderTypes: MerchantOrderTypesInfo = { merchantTimeZone: 'UTC' } as MerchantOrderTypesInfo;
    expect(pipe.transform(timeData, orderTypes)).toBe('');
  });
});
