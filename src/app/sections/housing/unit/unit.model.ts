import { Label } from '@shared/ui-components/label/label.model';
import { Facility, FacilityAttribute, IMapper } from '@sections/housing/facilities/facilities.model';
import { Attribute } from '@sections/housing/attributes/attributes.model';

export class Unit {
  key: number;
  parentKey: number;
  title: string;
  isFavorite: boolean;
  labels: Label[];
  attributes: FacilityAttribute[]
  occupantKeys: number[];

  constructor(options: any) {
    this.key = options.facilityKey;
    this.parentKey = options.parentKey;
    this.title = options.title;
    this.isFavorite = !!options.isFavorite;
    this.labels = Array.isArray(options.labels) ? options.labels : [];
    this.attributes = Array.isArray(options.attributes)? options.attributes.map(x => x): [];
    this.occupantKeys = options.occupantKeys || [];
  }
}

export class FacilityToUnitsMapper implements IMapper {
  map(items: Facility[]): Unit[] {
    return items.map(x => new Unit({title: x.facilityName, isFavorite: false, parentKey: x.topLevelKey,
      facilityKey: x.facilityId, occupantKeys:  Array.isArray(x.occupantKeys)? x.occupantKeys.map(y => y) : [],
      attributes: x.attributes,
      labels: Array.isArray(x.attributes) ? x.attributes.map(y => new Label(y.name)) : []}));
    }
  }
