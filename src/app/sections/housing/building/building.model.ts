import { Label } from '@shared/ui-components/label/label.model';
import { Facility, IMapper } from '@sections/housing/facilities/facilities.model';

export class Building {
  key: number;
  title: string;
  isFavorite: boolean;
  labels: Label[];

  constructor(options: any) {
    this.key = options.key;
    this.title = options.title;
    this.isFavorite = !!options.isFavorite;
    this.labels = Array.isArray(options.labels) ? options.labels : [];
  }
}

export class FacilityToBuildingMapper implements IMapper {
  map(items: Facility[]): Building[] {
    return items.map(x => new Building({key: x.facilityId, title: x.facilityName,
      isFavorite: false, labels: x.attributes.map(y => new Label(y.value))}))
  }
}