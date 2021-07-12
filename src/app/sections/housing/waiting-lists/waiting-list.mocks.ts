import { generatePatronAttributes } from "../applications/applications.mock";
import { PatronAttribute } from "../applications/applications.model";
import { WaitingList, WaitingListDetails } from "./waiting-lists.model";
import { FacilityAttribute } from '../facilities/facilities.model';


export function generateWaitingListDetails(index: number): WaitingListDetails {
    const attributes: PatronAttribute[] = generatePatronAttributes();
    const facilities: FacilityAttribute[] = [];//generateFacilityAttributes();
    const formDefinition = [];
    const patronAttributes: PatronAttribute[] = generatePatronAttributes();
    const waitListKey: number = 0;
    return new WaitingListDetails({
        facilities,
        attributes,
        formDefinition,
        patronAttributes,
        waitListKey
    });
}

export function generateWaitingList(amount: number = 3): WaitingList[] {
    return Array.apply(null, Array(amount)).map(generateWaitingList);
}

export function generateWaitingListInfo(index: number): WaitingList {

    return null;
}