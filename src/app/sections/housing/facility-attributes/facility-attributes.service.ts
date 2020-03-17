import { Injectable } from '@angular/core';

import { QuestionsEntries } from '../questions/questions-storage.service';

import { FacilityAttribute } from '../contracts/contracts.model';
import { QuestionFormControl, QuestionBase } from '../questions/types';

@Injectable({
  providedIn: 'root',
})
export class FacilityAttributesService {
  getAttributes(
    patronAttributes: FacilityAttribute[],
    parsedJson: any[],
    questionEntries: QuestionsEntries
  ): FacilityAttribute[] {
    const facilityControls: QuestionFormControl[] = parsedJson.filter(
      (control: QuestionBase) => control && (control as QuestionFormControl).consumerKey
    );
    const questions: string[] = Object.keys(questionEntries);

    if (!facilityControls.length || !questions.length) {
      return [];
    }

    return questions
      .filter((questionName: string) =>
        facilityControls.find((control: QuestionFormControl) => control.name === questionName)
      )
      .map((questionName: string) => {
        const value: any = questionEntries[questionName];
        const foundFacility: QuestionFormControl = facilityControls.find(
          (control: QuestionFormControl) => control.name === questionName
        );
        const attributeConsumerKey: number = foundFacility.consumerKey;
        const foundAttribute: FacilityAttribute = patronAttributes.find(
          (attribute: FacilityAttribute) => attribute.attributeConsumerKey === attributeConsumerKey
        );

        if (foundAttribute) {
          const facilityKey: number = foundAttribute.facilityKey;
          const facilityAttributeKey: number = foundAttribute.facilityAttributeKey;
          const effectiveDate: string = foundAttribute.effectiveDate;
          const endDate: string = foundAttribute.endDate;

          return new FacilityAttribute({
            attributeConsumerKey,
            value,
            facilityKey,
            facilityAttributeKey,
            effectiveDate,
            endDate,
          });
        }

        return new FacilityAttribute({ attributeConsumerKey, value });
      });
  }
}
