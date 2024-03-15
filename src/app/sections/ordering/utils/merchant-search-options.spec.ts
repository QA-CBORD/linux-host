import { MerchantSearchOptions } from './merchant-search-options';
import { MerchantSearchOption } from '../shared/models';
import { MerchantSearchOptionName } from '../ordering.config';

describe('MerchantSearchOptions', () => {
  let merchantSearchOptions: MerchantSearchOptions;

  beforeEach(() => {
    merchantSearchOptions = new MerchantSearchOptions();
  });

  it('should return an empty list when no search options have been added', () => {
    expect(merchantSearchOptions.getSearchOptions()).toEqual([]);
  });

  it('should return a list with one search option when one search option has been added', () => {
    const searchOption: MerchantSearchOption = { key: MerchantSearchOptionName.ADDRESS, value: 0};
    merchantSearchOptions.addSearchOption(searchOption);

    expect(merchantSearchOptions.getSearchOptions()).toEqual([searchOption]);
  });

  it('should return a list with multiple search options when multiple search options have been added', () => {
    const searchOption1: MerchantSearchOption = { key: MerchantSearchOptionName.ACTIVE, value: 0};
    const searchOption2: MerchantSearchOption = { key: MerchantSearchOptionName.ADDED_AFTER_DATE, value: 1 };
    merchantSearchOptions.addSearchOption(searchOption1);
    merchantSearchOptions.addSearchOption(searchOption2);

    expect(merchantSearchOptions.getSearchOptions()).toEqual([searchOption1, searchOption2]);
  });
});