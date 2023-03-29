import { FacilityAttribute } from '@sections/housing/facilities/facilities.model';
import { DataType } from '@sections/housing/attributes/attributes.model';
import { isDefined } from '@sections/housing/utils';
import { isDate } from '@sections/housing/utils/is-date';
import { Label } from '@sections/housing/housing.model';

export class  LabelHelper {


  /**
   * Used to evaluate what labels should be returned for facility or building
   * @param attributes - Facility Attributes
   * @public
   */
  public static getLabels(attributes: FacilityAttribute[]): Label[] {
    return attributes.filter(
      attribute => {
        if (isDefined(attribute.value) && !!attribute.value) {
          return true;
        }
      }
    ).filter(attrib => {
      const type = this.findType(attrib);

      switch (type) {
        case DataType.Date:
          return false;
        case DataType.Integer:
          return false;
        case DataType.YesNo:
          return attrib.value === 'Yes'? true: false;
        case DataType.String:
          if (attrib.name !== 'Full Name' &&
            attrib.name !== 'Assignment_Limit') {
            return true;
          } else {
            return false;
          }
      }
    }).map(attrib => {
      return new Label(attrib.name)
    });
  }

  /**
   *  Finds attribute dataType
   * @param attribute - Any Facility Attribute
   */
  public static findType(attribute: FacilityAttribute) {
    if (isDate(attribute.value)) {
      return DataType.Date
    } else if (!isNaN(Number.parseInt(attribute.value, 10))) {
      return DataType.Integer
    } else if (attribute.value === "Yes" || attribute.value === "No") {
      return DataType.YesNo
    } else {
      return DataType.String
    }
  }
}
