import { generatePatronAttributes } from "../applications/applications.mock";
import { PatronAttribute } from "../applications/applications.model";
import { generateChargeSchedules } from "../charge-schedules/charge-schedules.mock";
import { ChargeSchedule } from "../charge-schedules/charge-schedules.model";
import { PatronAddress } from "@sections/housing/addresses/address.model";
import { generateQuestions } from "../questions/questions.mock";
import { WaitingList, WaitingListDetails } from "./waiting-lists.model";
import { NonAssignmentInfo } from "../non-assignments/non-assignments.model";
import { FacilityAttribute } from '../facilities/facilities.model';


export function generateWaitingListDetails(index: number): WaitingListDetails {
    const attribute: PatronAttribute[] = generatePatronAttributes();
    const facilities: FacilityAttribute[] = [];//generateFacilityAttributes();
    const formDefinition = []
    const waitListKey: number = 0;
    return new WaitingListDetails({
        facilities,
        attributes: attribute,
        formDefinition,
        waitListKey
    });
}

export function generateWaitingList(amount: number = 3): WaitingList[] {
    return Array.apply(null, Array(amount)).map(generateWaitingList);
}

export function generateWaitingListInfo(index: number): WaitingList {

    return null;
}