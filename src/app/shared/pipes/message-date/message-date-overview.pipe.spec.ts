import { TestBed } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { SecureMessageInfo } from '@core/model/secure-messaging/secure-messaging.model';
import { MessageDatePipeOverview } from './message-date-overview.pipe';

describe('MessageDatePipeOverview', () => {
  let pipe: MessageDatePipeOverview;

  beforeEach(() => {
    const datePipeStub = () => ({ transform: (sentDate, string) => ({}) });
    TestBed.configureTestingModule({
      providers: [
        MessageDatePipeOverview,
        { provide: DatePipe, useFactory: datePipeStub }
      ]
    });
    pipe = TestBed.inject(MessageDatePipeOverview);
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
