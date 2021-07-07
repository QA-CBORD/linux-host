import { generateApplications, generateApplicationDetails } from './applications/applications.mock';
import { generateContractsList, generateContractDetails } from './contracts/contracts.mock';

import { DefinitionsResponse, DetailsResponse } from './housing.model';
import { ApplicationDetails } from './applications/applications.model';
import { ContractListDetails, ContractDetails } from './contracts/contracts.model';
import { NonAssignmentDetails, NonAssignmentListDetails } from './non-assignments/non-assignments.model';
import { generateNonAssignmentDetails, generateNonAssignmentsList } from './non-assignments/non-assignments.mock';
import { generateWaitingList } from '@sections/housing/waiting-lists/waiting-list.mocks';
import { WaitingListDetails, WaitingList } from './waiting-lists/waiting-lists.model';
import { generateWaitingListDetails } from './waiting-lists/waiting-list.mocks';

export function generateDefinitionsResponse(): DefinitionsResponse {
  const applicationDefinitions: ApplicationDetails[] = generateApplications();
  const contractDetails: ContractListDetails[] = generateContractsList();
  const nonAssignmentDetails: NonAssignmentListDetails[] = generateNonAssignmentsList();
  const waitingLists: WaitingList[] = generateWaitingList();

  return new DefinitionsResponse({
    applicationDefinitions,
    contractDetails,
    nonAssignmentDetails,
    waitingLists
  });
}

export function generateDetailsResponse(key: number): DetailsResponse {
  const applicationDetails: ApplicationDetails = generateApplicationDetails(null, key);
  const contractDetails: ContractDetails = generateContractDetails(key);
  const nonAssignmentDetails: NonAssignmentDetails = generateNonAssignmentDetails(key);
  const waitingListDetails: WaitingListDetails = generateWaitingListDetails(key);

  return new DetailsResponse({
    applicationDetails,
    contractDetails,
    nonAssignmentDetails,
    waitingListDetails
  });
}
