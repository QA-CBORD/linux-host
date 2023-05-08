import { TestBed } from '@angular/core/testing';
import { NullableContent } from '@shared/model/content-strings/content-string-models';
import { MutableMessage } from '@shared/model/shared-api';
import { StPopoverComponentDataModel } from '@shared/model/st-popover-data.model';
import { ForgotPasswordCsModel } from 'src/app/non-authorized/pages/forgot-password/models/forgot-password-content-strings.model';
import { MessageProxy } from './injectable-message.proxy';

describe(MessageProxy, () => {
  let service: MessageProxy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    service = TestBed.inject(MessageProxy);
  });

  it('should call functions', () => {
    Object.defineProperty(service, 'messageHolder', {} as MutableMessage);

    const spy1 = jest.spyOn(service as any, 'put');
    const spy2 = jest.spyOn(service as any, 'get');

    service.put({ test: 'hello' });
    service.get<object>();
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('should return a message holder', () => {
    service.put({ test: 'hello' });
    
    expect(service.get<object>()).toBeTruthy();
  });
});
