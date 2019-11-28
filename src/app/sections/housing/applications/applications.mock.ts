import { generateQuestions } from '../questions/questions.mock';

import {
  Application,
  ApplicationStatus,
  ApplicationDetails,
  ApplicationDefinition,
  PatronApplication,
  PatronAttribute,
  PatronPreference,
} from './applications.model';
import { QuestionBase } from '../questions/types/question-base';

export function generateApplication(_: any, index: number): Application {
  return new Application(
    index + 100,
    67,
    index + 200,
    `New application ${index + 100}`,
    ApplicationStatus.New,
    null,
    null
  );
}

export function generateApplications(amount: number = 3): Application[] {
  return Array.apply(null, Array(amount)).map(generateApplication);
}

export function generateApplicationDefinition(key: number): ApplicationDefinition {
  const questions: QuestionBase[] = generateQuestions();

  return new ApplicationDefinition(key, 67, `New application 100`, JSON.stringify(questions));
}

export function generatePatronApplication(key: number): PatronApplication {
  return new PatronApplication(200, key, 8000712, null, null, null, null, null, false, false, false);
}

export function generatePatronAttribute(_: any, index: number): PatronAttribute {
  return new PatronAttribute(index, index + 100, `Attribute Value ${index}`);
}

export function generatePatronAttributes(amount: number = 2): PatronAttribute[] {
  return Array.apply(null, Array(amount)).map(generatePatronAttribute);
}

export function generatePatronPreference(_: any, index: number): PatronPreference {
  return new PatronPreference(index, index + 9000419, index, index + 200);
}

export function generatePatronPreferences(amount: number = 2): PatronPreference[] {
  return Array.apply(null, Array(amount)).map(generatePatronPreference);
}

export function generateApplicationDetails(key: number): ApplicationDetails {
  const applicationDefinition: ApplicationDefinition = generateApplicationDefinition(key);
  const patronApplication: PatronApplication = generatePatronApplication(key);
  const patronAttributes: PatronAttribute[] = generatePatronAttributes();
  const patronPreferences: PatronPreference[] = generatePatronPreferences();

  return new ApplicationDetails(applicationDefinition, patronApplication, patronAttributes, patronPreferences);
}
