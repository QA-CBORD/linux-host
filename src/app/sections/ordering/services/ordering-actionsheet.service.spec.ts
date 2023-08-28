import { TestBed } from '@angular/core/testing';
import { OrderActionSheetService } from './odering-actionsheet.service';

describe('OrderActionSheetService', () => {
  let service: OrderActionSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderActionSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit openActionSheet event', () => {
    let isOpenActionSheetCalled = false;

    service.openActionSheet$.subscribe(() => {
      isOpenActionSheetCalled = true;
    });

    service.openActionSheet();

    expect(isOpenActionSheetCalled).toBeTruthy();
  });
});
