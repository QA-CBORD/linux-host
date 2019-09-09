import { MerchantSearchOption } from '../shared/models';

export class MerchantSearchOptions {
  private list: MerchantSearchOption[] = [];

  constructor() {}

  getSearchOptions() {
    return this.list;
  }

  addSearchOption(searchOption: MerchantSearchOption) {
    this.list.push(searchOption);
  }

  // addSearchOptions(searchOptions: MerchantSearchOption[]) {

  //   this.searchOptions = { ...this.searchOptions, searchOptions };
  // }
}
