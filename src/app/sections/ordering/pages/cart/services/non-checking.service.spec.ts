import { NonCheckingService } from './non-checking.service';

describe('NonCheckingService', () => {
  let service: NonCheckingService;

  beforeEach(() => {
    service = new NonCheckingService();
  })

  it('summary be defined', () => {
    expect(service.summary$).toBeDefined();
  });

  it('summary should return summary with values', () => {
    service.setSummary({
      tax: 1,
      checkNumber: 12345,
      discount: 1
    });

    service.summary$.subscribe((summary) => {
      expect(summary.tax).toEqual(1);
      expect(summary.checkNumber).toEqual(12345);
      expect(summary.discount).toEqual(1);
    });
  });
});
