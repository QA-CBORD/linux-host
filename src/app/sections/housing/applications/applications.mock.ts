import { generateQuestions } from '../questions/questions.mock';

import {
  ApplicationStatus,
  ApplicationDetails,
  ApplicationDefinition,
  PatronApplication,
  PatronAttribute,
  PatronPreference,
} from './applications.model';
import { QuestionBase } from '../questions/types/question-base';

export function generateApplications(amount: number = 3): ApplicationDetails[] {
  return Array.apply(null, Array(amount)).map(generateApplicationDetails);
}

export function generateApplicationDefinition(key: number): ApplicationDefinition {
  const questions: QuestionBase[] = generateQuestions();

  return new ApplicationDefinition({
    key,
    termKey: 67,
    applicationTitle: 'New application 100',
    applicationFormJson: JSON.stringify(questions),
  });
}

export function generatePatronApplication(applicationDefinitionKey: number): PatronApplication {
  return new PatronApplication({
    applicationDefinitionKey,
    status: ApplicationStatus.New,
    key: 200,
    patronKey: 8000712,
  });
}

export function generatePatronAttribute(_: any, index: number): PatronAttribute {
  const nowDateTime: string = new Date().toISOString();
  const attributeConsumerKey = index + 100;
  const value: string = `Attribute Value ${index}`;
  const key: number = index;
  const patronKey: number = 8000712;
  const effectiveDate: string = nowDateTime;
  const endDate: string = nowDateTime;

  return new PatronAttribute({
    attributeConsumerKey,
    value,
    key,
    patronKey,
    effectiveDate,
    endDate,
  });
}

export function generatePatronAttributes(amount: number = 2): PatronAttribute[] {
  return Array.apply(null, Array(amount)).map(generatePatronAttribute);
}

export function generatePatronPreference(_: any, index: number): PatronPreference {
  const key: number = index;
  const preferenceKey: number = index + 9000419;
  const rank: number = index;
  const facilityKey: number = index + 200;

  return new PatronPreference({
    key,
    preferenceKey,
    rank,
    facilityKey,
  });
}

export function generatePatronPreferences(amount: number = 2): PatronPreference[] {
  return Array.apply(null, Array(amount)).map(generatePatronPreference);
}

export function generateApplicationDetails(key: number): ApplicationDetails {
  const applicationDefinition: ApplicationDefinition = generateApplicationDefinition(key);
  const patronApplication: PatronApplication = generatePatronApplication(key);
  const patronAttributes: PatronAttribute[] = generatePatronAttributes();
  const patronPreferences: PatronPreference[] = generatePatronPreferences();

  return new ApplicationDetails({
    applicationDefinition,
    patronApplication,
    patronAttributes,
    patronPreferences,
  });
}
