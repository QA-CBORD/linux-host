import { MerchantSearchOption } from '../shared/models';

export class MerchantSearchOptions {
  private list: MerchantSearchOption[] = [];

  getSearchOptions(): MerchantSearchOption[] {
    return this.list;
  }

  addSearchOption(searchOption: MerchantSearchOption) {
    this.list.push(searchOption);
  }
}
