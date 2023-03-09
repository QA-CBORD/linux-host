import { generateApplications, generateApplicationDetails } from '../../../sections/housing/applications/applications.mock';
import { generateContractsList, generateContractDetails } from '../../../sections/housing/contracts/contracts.mock';

import { DefinitionsResponse, DetailsResponse, Label } from '../../../sections/housing/housing.model';
import { ApplicationDetails } from '../../../sections/housing/applications/applications.model';
import { ContractListDetails, ContractDetails } from '../../../sections/housing/contracts/contracts.model';
import { generateNonAssignmentDetails, generateNonAssignmentsList } from '@sections/housing/non-assignments/non-assignments.mock';
import { NonAssignmentDetails, NonAssignmentListDetails } from '@sections/housing/non-assignments/non-assignments.model';
import { WaitingListDetails, WaitingList } from '../../../sections/housing/waiting-lists/waiting-lists.model';
import { generateWaitingList } from '@sections/housing/waiting-lists/waiting-list.mocks';
import { generateWaitingListDetails } from '../../../sections/housing/waiting-lists/waiting-list.mocks';
import { WorkOrder } from '@sections/housing/work-orders/work-orders.model';
import { generateWorkOrders, generateWorkOrdersDetails } from '../../../sections/housing/work-orders/work-orders.mock';
import { WorkOrderDetails } from '../../../sections/housing/work-orders/work-orders.model';

export function generateDefinitionsResponse(): DefinitionsResponse {
  const applicationDefinitions: ApplicationDetails[] = generateApplications();
  const contractDetails: ContractListDetails[] = generateContractsList();
  const nonAssignmentDetails: NonAssignmentListDetails[] = generateNonAssignmentsList();
  const waitingLists: WaitingList[] = generateWaitingList();
  const workOrders: WorkOrder = generateWorkOrders();

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
    waitingListDetails: waitingListDetails,
    workOrdersDetails
  });
}

export function generateLabel(_, index: number): Label {
  return new Label(`Honors Unit ${index}`);
}

export function generateLabels(amount = 2): Label[] {
  // eslint-disable-next-line prefer-spread
  return Array.apply(null, Array(amount)).map(generateLabel);
}
