import { Facility } from '@sections/housing/facilities/facilities.model';

export enum SortDirection {
  ascend,
  descend,
}

export class Category {
  constructor(public name: string, public attributeKey: number) {}
}

export class CategoryOptions {
  private _options: Map<string, string[]>;

  constructor() {
    this._options = new Map<string, string[]>();
  }

  public addOptions(category: string, options: string[]): void {
    this._options.set(category, options);
  }
  public addOption(category: string, option: string): void {
    if (!this.hasOption(category, option)) {
      const values = this._options.get(category);
      if (values) {
        this.addOptions(category, [...values, option]);
      } else {
        this.addOptions(category, [option]);
      }
    }
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
