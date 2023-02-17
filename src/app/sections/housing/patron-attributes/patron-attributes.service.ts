import { Injectable } from '@angular/core';

import { QuestionsEntries } from '../questions/questions-storage.service';

import { PatronAttribute } from '../applications/applications.model';
import { QuestionFormControl, QuestionBase } from '../questions/types';

@Injectable({
  providedIn: 'root',
})
export class PatronAttributesService {
  getAttributes(
    patronAttributes: PatronAttribute[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parsedJson: any[],
    questionEntries: QuestionsEntries
  ): PatronAttribute[] {
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
        const value = questionEntries[questionName];
        const foundFacility: QuestionFormControl = facilityControls.find(
          (control: QuestionFormControl) => control.name === questionName
        );
        const attributeConsumerKey: number = foundFacility.consumerKey;
        const foundAttribute: PatronAttribute = patronAttributes.find(
          (attribute: PatronAttribute) => attribute.attributeConsumerKey === attributeConsumerKey
        );

        if (foundAttribute) {
          const key: number = foundAttribute.key;
          const patronKey: number = foundAttribute.patronKey;
          const effectiveDate: string = foundAttribute.effectiveDate;
          const endDate: string = foundAttribute.endDate;

          return new PatronAttribute({
            attributeConsumerKey,
            value,
            key,
            patronKey,
            effectiveDate,
            endDate,
          });
        }

        return new PatronAttribute({ attributeConsumerKey, value });
      });
  }
}
