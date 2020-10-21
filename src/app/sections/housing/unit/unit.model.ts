import { Label } from '@shared/ui-components/label/label.model';
import { Facility, IMapper } from '@sections/housing/facilities/facilities.model';

export class Unit {
  key: number;
  parentKey: number;
  title: string;
  isFavorite: boolean;
  labels: Label[];
  occupantKeys: number[];

  constructor(options: any) {
    this.key = options.facilityKey;
    this.parentKey = options.parentKey;
    this.title = options.title;
    this.isFavorite = !!options.isFavorite;
    this.labels = Array.isArray(options.labels) ? options.labels : [];
    this.occupantKeys = options.occupancyKeys;
  }
}

export class FacilityToUnitsMapper implements IMapper {
  map(items: Facility[]): Unit[] {
    return items.map(x => new Unit({title: x.facilityName, isFavorite: false, parentKey: x.topLevelKey,
      facilityKey: x.facilityId, occupantKeys:  Array.isArray(x.occupantKeys)? x.occupantKeys.map(y => y) : [],
      labels: Array.isArray(x.attributes) ? x.attributes.map(y => new Label(y.value)) : []}));
    }
  }
