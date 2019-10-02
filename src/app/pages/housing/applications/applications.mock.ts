import { generateQuestions } from '../questions/questions.mock';

import { PatronApplication } from './applications.model';

export function generatePatronApplication(_: any, index: number): PatronApplication {
  return {
    applicationDefinitionId: 100 + index,
    createdDateTime: '0001-01-01T00:00:00',
    submittedDateTime: null,
    acceptedDateTime: null,
    cancelledDateTime: null,
    modifiedDate: null,
    patronId: 8001138,
    isApplicationSubmitted: false,
    isApplicationAccepted: false,
    isApplicationCanceled: false,
    applicationTitle: `New application ${index + 1}`,
    applicationTerm: 46,
    applicationFormJson: JSON.stringify(generateQuestions()),
  };
}

export function generatePatronApplications(amount: number = 3): PatronApplication[] {
  return Array.apply(null, Array(amount)).map(generatePatronApplication);
}
