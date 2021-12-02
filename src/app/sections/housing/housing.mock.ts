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
import { WorkOrder, WorkOrderDetails } from './work-orders/work-orders.model';
import { generateWorkOrders, generateWorkOrdersDetails } from './work-orders/work-orders.mock';


export function generateDefinitionsResponse(): DefinitionsResponse {
  const applicationDefinitions: ApplicationDetails[] = generateApplications();
  const contractDetails: ContractListDetails[] = generateContractsList();
  const nonAssignmentDetails: NonAssignmentListDetails[] = generateNonAssignmentsList();
  const waitingLists: WaitingList[] = generateWaitingList();
  const workOrders: WorkOrder= generateWorkOrders();

  return new DefinitionsResponse({
    applicationDefinitions,
    contractDetails,
    nonAssignmentDetails,
    waitingLists,
    workOrders
  });
}

export function generateDetailsResponse(key: number): DetailsResponse {
  const applicationDetails: ApplicationDetails = generateApplicationDetails(null, key);
  const contractDetails: ContractDetails = generateContractDetails(key);
  const nonAssignmentDetails: NonAssignmentDetails = generateNonAssignmentDetails(key);
  const waitingListDetails: WaitingListDetails = generateWaitingListDetails(key);
  const workOrdersDetails: WorkOrderDetails = generateWorkOrdersDetails();

  return new DetailsResponse({
    applicationDetails,
    contractDetails,
    nonAssignmentDetails,
    waitingListDetails,
    workOrdersDetails
  });
}
