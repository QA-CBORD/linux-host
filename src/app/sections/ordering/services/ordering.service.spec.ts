import { TestBed } from '@angular/core/testing';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { OrderingService } from './ordering.service';
import { of } from 'rxjs';

describe('OrderingService', () => {
  let service: OrderingService;

  beforeEach(() => {
    const contentStringsFacadeServiceStub = () => ({
      getContentString$: (patronUi, ordering, name) => ({ pipe: () => ({}) }),
      resolveContentString$: (get_common, error, name) => ({ pipe: () => ({}) })
    });
    TestBed.configureTestingModule({
      providers: [
        OrderingService,
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(OrderingService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getContentStringByName', () => {
    it('makes expected calls', () => {
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(
        ContentStringsFacadeService
      );
      const oRDERING_CONTENT_STRINGSStub: ORDERING_CONTENT_STRINGS = <any>{};
     jest.spyOn(
        contentStringsFacadeServiceStub,
        'getContentString$'
      );
      service.getContentStringByName(oRDERING_CONTENT_STRINGSStub);
      expect(
        contentStringsFacadeServiceStub.getContentString$
      ).toHaveBeenCalled();
    });
  });

  describe('getContentErrorStringByName', () => {
    it('makes expected calls', () => {
      const contentStringsFacadeServiceStub: ContentStringsFacadeService = TestBed.inject(
        ContentStringsFacadeService
      );
      const oRDERING_CONTENT_STRINGSStub: ORDERING_CONTENT_STRINGS = <any>{};
     jest.spyOn(
        contentStringsFacadeServiceStub,
        'resolveContentString$'
      );
      service.getContentErrorStringByName(oRDERING_CONTENT_STRINGSStub);
      expect(
        contentStringsFacadeServiceStub.resolveContentString$
      ).toHaveBeenCalled();
    });
  });

  describe('getContentErrorStringByException', () => {
    it('returns the content error string if the error message includes "CONTENT_STRING"', async () => {
      const errorMessage = 'Some error message CONTENT_STRING:ERROR_MESSAGE_KEY';
      const defaultMessage = 'Default error message';
      const expectedContentString = 'Content error message';
  
      const getContentErrorStringByNameSpy = jest.spyOn(service, 'getContentErrorStringByName').mockReturnValue(of(expectedContentString));
  
      const result = await service.getContentErrorStringByException(errorMessage, defaultMessage);
  
      expect(getContentErrorStringByNameSpy).toHaveBeenCalledWith('ERROR_MESSAGE_KEY');
      expect(result).toEqual(expectedContentString);
    });
  
    it('returns the default message if the error message does not include "CONTENT_STRING"', async () => {
      const errorMessage = 'Some error message';
      const defaultMessage = 'Default error message';
  
      const result = await service.getContentErrorStringByException(errorMessage, defaultMessage);
  
      expect(result).toEqual(defaultMessage);
    });
  });
  
});
