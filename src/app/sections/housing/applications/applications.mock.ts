import { generateQuestions } from '../questions/questions.mock';

import { Application } from './applications.model';

export function generateApplication(_: any, index: number): Application {
  return {
    applicationDefinitionId: 100 + index,
    createdDateTime: '0001-01-01T00:00:00',
    submittedDateTime: null,
    acceptedDateTime: null,
    cancelledDateTime: null,
    modifiedDate: null,
    patronId: 8000712,
    isApplicationSubmitted: false,
    isApplicationAccepted: false,
    isApplicationCanceled: false,
    applicationTitle: `New application ${index + 100}`,
    applicationTerm: 67,
    applicationFormJson: JSON.stringify(generateQuestions()),
  };
}

export function generateApplications(amount: number = 3): Application[] {
  return Array.apply(null, Array(amount)).map(generateApplication);
}
