import { generatePatronAttributes } from "../applications/applications.mock";
import { PatronAttribute } from "../applications/applications.model";
import { generateChargeSchedules } from "../charge-schedules/charge-schedules.mock";
import { ChargeSchedule } from "../charge-schedules/charge-schedules.model";
import { generateQuestions } from "../questions/questions.mock";
import { NonAssignmentDetails, NonAssignmentInfo, NonAssignmentListDetails } from "./non-assignments.model";


export function generateNonAssignmentDetails(index: number): NonAssignmentDetails {
    const nonAssignmentInfo: NonAssignmentInfo = generateNonAssignmentInfo(index);
    const formJson: string = JSON.stringify(generateQuestions());
    const chargeSchedules: ChargeSchedule[] = generateChargeSchedules();
    const patronAttributes: PatronAttribute[] = generatePatronAttributes();
    const assetRequirements: any[] = [];//generateFacilityAttributes();

    return new NonAssignmentDetails({
        nonAssignmentInfo,
        formJson,
        chargeSchedules,
        patronAttributes,
        assetRequirements  
    });
}

export function generateNonAssignmentsList(amount: number = 3): NonAssignmentListDetails[] {
    return Array.apply(null, Array(amount)).map(generateNonAssignmentDetails);
}

export function generateNonAssignmentInfo(index: number): NonAssignmentInfo {

    return new NonAssignmentInfo({

    });
}