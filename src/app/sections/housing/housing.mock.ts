import { generateApplications, generateApplicationDetails } from './applications/applications.mock';
import { generateContractsList, generateContractDetails } from './contracts/contracts.mock';

import { DefinitionsResponse, DetailsResponse } from './housing.model';
import { ApplicationDetails } from './applications/applications.model';
import { ContractListDetails, ContractDetails } from './contracts/contracts.model';

export function generateDefinitionsResponse(): DefinitionsResponse {
  const applicationDefinitions: ApplicationDetails[] = generateApplications();
  const contractDetails: ContractListDetails[] = generateContractsList();

  return new DefinitionsResponse({
    applicationDefinitions,
    contractDetails,
  });
}

export function generateDetailsResponse(key: number): DetailsResponse {
  const applicationDetails: ApplicationDetails = generateApplicationDetails(null, key);
  const contractDetails: ContractDetails = generateContractDetails(key);

  return new DetailsResponse({
    applicationDetails,
    contractDetails,
  });
}
