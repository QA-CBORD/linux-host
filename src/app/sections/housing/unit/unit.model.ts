import { Label } from '@shared/ui-components/label/label.model';
import { Facility, IMapper } from '@sections/housing/facilities/facilities.model';

export class Unit {
  title: string;
  isFavorite: boolean;
  labels: Label[];

  constructor(options: any) {
    this.title = options.title;
    this.isFavorite = !!options.isFavorite;
    this.labels = Array.isArray(options.labels) ? options.labels : [];
  }
}

export class FacilityToUnitsMapper implements IMapper {
  map(items: Facility[]): Unit[] {
    return items.map(x => new Unit({title: x.facilityName, isFavorite: false,
      labels: x.attributes.map(y => new Label(y.value))}));
  }
}

