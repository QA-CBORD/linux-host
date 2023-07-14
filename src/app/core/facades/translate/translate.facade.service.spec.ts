import { of } from 'rxjs';
import { TranslateFacadeService } from './translate.facade.service';

const mockContentStringsStateService = {
  state$: of([
    { domain: 'domain1', category: 'category1', name: 'name1', value: 'value1' },
    { domain: 'domain2', category: 'category2', name: 'name2', value: 'value2' },
  ]),
};

const mockTranslateService = {
  currentLang: 'en',
  setTranslation: jest.fn(),
};

describe('TranslateFacadeService', () => {
  let translateFacadeService: TranslateFacadeService;

  beforeEach(() => {
    translateFacadeService = new TranslateFacadeService(
      mockTranslateService as any,
      mockContentStringsStateService as any
    );
  });

  it('should set translations correctly', () => {
    translateFacadeService.listenForContentStringStateChanges();

    expect(mockTranslateService.setTranslation).toHaveBeenCalledWith(
      'en',
      {
        domain1: {
          category1: {
            name1: 'value1',
          },
        },
        domain2: {
          category2: {
            name2: 'value2',
          },
        },
      },
      true
    );
  });
});
