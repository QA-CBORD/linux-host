import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { OrderTypePipe } from './order-type.pipe';
import { MerchantInfo } from '@sections/ordering';

describe('OrderTypePipe', () => {
  let pipe: OrderTypePipe;

  const translateServiceStub = {
    instant: (key: string) => key, // Stub for TranslateService.instant
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [OrderTypePipe, { provide: TranslateService, useValue: translateServiceStub }],
    });

    pipe = TestBed.inject(OrderTypePipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "Smart Shopping" for walkout', () => {
    const merchantInfo: MerchantInfo = { orderTypes: null, walkout: true } as MerchantInfo;
    const result = pipe.transform(merchantInfo, true);
    expect(result).toEqual('Smart Shopping');
  });

  it('should return an empty string if not able to order', () => {
    const merchantInfo: MerchantInfo = { orderTypes: null, walkout: false } as MerchantInfo;
    const result = pipe.transform(merchantInfo, false);
    expect(result).toEqual('');
  });

  it('should return an empty string if orderTypes are not provided', () => {
    const merchantInfo: MerchantInfo = { orderTypes: null, walkout: false } as MerchantInfo;
    const result = pipe.transform(merchantInfo, true);
    expect(result).toEqual('');
  });
});
