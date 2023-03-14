import { Label } from '@shared/ui-components/label/label.model';
import { Facility, FacilityAttribute, IMapper } from '@sections/housing/facilities/facilities.model';
import { LabelHelper } from '@sections/housing/rooms/labelHelper';

export class Unit {
  key: number;
  parentKey: number;
  parentName: string;
  title: string;
  isFavorite: boolean;
  labels: Label[];
  attributes: FacilityAttribute[]
  occupantKeys: number[];

  constructor(options) {
    this.key = options.facilityKey;
    this.parentKey = options.parentKey;
    this.parentName = options.topLevelName;
    this.title = options.title;
    this.isFavorite = !!options.isFavorite;
    this.labels = Array.isArray(options.labels) ? options.labels : [];
    this.attributes = Array.isArray(options.attributes)? options.attributes.map(x => x): [];
    this.occupantKeys = options.occupantKeys || [];
  }
}

export class FacilityToUnitsMapper implements IMapper {
  map(items: Facility[]): Unit[] {
    return items.map(x => new Unit({ title: x.facilityName, isFavorite: false, parentKey: x.topLevelKey,
      facilityKey: x.facilityId, topLevelName: x.topLevelName,
      occupantKeys:  Array.isArray(x.occupantKeys)? x.occupantKeys.map(y => y) : [], attributes: x.attributes,
      labels: Array.isArray(x.attributes)? LabelHelper.getLabels(x.attributes) : [] }));
    }
  }
