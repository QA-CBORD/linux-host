import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { MessageDatePipe } from './message-date.pipe';

describe('MessageDatePipe', () => {
  let pipe: MessageDatePipe;

  beforeEach(() => {
    const datePipeStub = () => ({ transform: (sentDate, string) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        MessageDatePipe,
        { provide: DatePipe, useFactory: datePipeStub }
      ]
    });
    pipe = TestBed.inject(MessageDatePipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms X to Y', () => {
    const value: any = 'X';
    expect(pipe.transform(value)).toEqual('Y');
  });

  describe('transform', () => {
    it('makes expected calls', () => {
      const datePipeStub: DatePipe = TestBed.inject(DatePipe);
      const secureMessageInfoStub: SecureMessageInfo = <any>{};
     jest.spyOn(datePipeStub, 'transform');
      pipe.transform(secureMessageInfoStub);
      expect(datePipeStub.transform).toHaveBeenCalled();
    });
  });
});
