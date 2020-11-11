import { Facility } from '@sections/housing/facilities/facilities.model';

export enum SortDirection {
  ascend,
  descend,
}

export class Category {
  constructor(public name: string, public attributeKey: number) {}
}

export class CategoryOptionDetail {
  key: string;
  category: string;
  value: string;
  selected: boolean = false;

  constructor(category: string,option: string , selected: false) {
    this.key = `${category}${option}`.trim();
    this.selected = selected;
    this.category = category;
    this.value = option;
  }
}


export class CategoryOptions {
  private _options: Map<string, string[]>;
  private _optionDetails: CategoryOptionDetail[] = [];
  constructor() {
    this._options = new Map<string, string[]>();
  }

  public addOptions(category: string, options: string[]): void {
    this._options.set(category, options);
    options.forEach(x => this.addOptionDetails(category, x, false));
  }
  public addOption(category: string, option: string): void {
    if (!this.hasOption(category, option)) {
      const values = this._options.get(category);
      if (values) {
        this.addOptions(category, [...values, option]);
        this.addOptionDetails(category,option, false);
      } else {
        this.addOptions(category, [option]);
        this.addOptionDetails(category,option, false);
      }
    }
  }
  public getOptionDetails(category: string, option: string): CategoryOptionDetail {
    return this._optionDetails.find(x => x.key === `${category}${option}`.trim());
  }

   private addOptionDetails(category, option, isSelected) {
    this._optionDetails.push(new CategoryOptionDetail(category, option, isSelected));
  }

  public hasOption(category: string, option: string): boolean {
    const options = this._options.get(category);
    return options? options.includes(option): false;
  }
  public addBuildingOptions(parentFacilities: Facility[]): void {
    const facilityNames = parentFacilities.map(x => x.facilityName);
    this.addOptions('Buildings', facilityNames);
  }
  public getCategoryOptions(): {[key: string]: string[]} {
    let options = {};
    for (let [key, values] of Array.from(this._options.entries())) {
      options[key] = values;
    }

    return options;
  }

  public removeAll(): void {
    this._options.clear();
  }
}
