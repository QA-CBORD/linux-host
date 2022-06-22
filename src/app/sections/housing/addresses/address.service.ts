import { Injectable } from "@angular/core";
import { QuestionsEntries } from "../questions/questions-storage.service";
import { QUESTIONS_SOURCES } from "../questions/questions.model";
import { QuestionAddressTypeGroup, QuestionFormControl } from "../questions/types";
import { PatronAddress, AddressFields } from "./address.model";

@Injectable({
    providedIn: 'root',
  })
  export class PatronAddressService {

    getAddresses(
        addresses: PatronAddress[],
        parsedJson: any[],
        questionEntries: QuestionsEntries
    ): PatronAddress[] {
        const addressTypeControls: any[] = parsedJson.filter(
            (control: any) => {
                return control 
                    && (control as QuestionFormControl).source === QUESTIONS_SOURCES.ADDRESS_TYPES
                    && control.addressTypeId
            }
        );
        
        const questions: string[] = Object.keys(questionEntries);
    
        if (!addressTypeControls.length || !questions.length) {
            return [];
        }

        const patronAddresses: PatronAddress[] = [];

        const addressQuestions = questions.filter((questionName: string) =>
            addressTypeControls.find((control: any) =>
                questionName.startsWith(`text-${control.addressTypeId}-`)));
        
        addressTypeControls.forEach((addressType: QuestionAddressTypeGroup) => {
            let addrName = '', addrLn1 = '', addrLn2 = '', city = '';
            let state = '', country = '', zip = '', addrPhone = '', email = '';
            let addressKey = 0;
            let patronId = 0;
            const addrTypeKey = addressType.addressTypeId;
            
            const foundAddress = addresses.find((addr: PatronAddress) => addr.addrTypeKey === addrTypeKey);

            const selectedFields = addressType.values.filter(at => at.selected);
            selectedFields.forEach(field => {
                const value = questionEntries[addressQuestions.find(a => a === `text-${addressType.addressTypeId}-${field.value}`)];
                switch (field.label) {
                    case AddressFields.ADDRESS_NAME:
                        addrName = value;
                        break;
                    case AddressFields.ADDRESS_LINE_1:
                        addrLn1 = value;
                        break;
                    case AddressFields.ADDRESS_LINE_2:
                        addrLn2 = value;
                        break;
                    case AddressFields.CITY:
                        city = value;
                        break;
                    case AddressFields.COUNTRY:
                        country = value;
                        break;
                    case AddressFields.STATE:
                        state = value;
                        break;
                    case AddressFields.ZIP_CODE:
                        zip = value;
                        break;
                    case AddressFields.PHONE_NUMBER:
                        addrPhone = value;
                        break;
                    case AddressFields.EMAIL:
                        email = value;
                        break;
                    default:
                      break;
                  } 
            });

            if (foundAddress) {
                patronId = foundAddress.patronId;
                addressKey = foundAddress.addressKey;
            }

            patronAddresses.push(new PatronAddress({
                addressKey,
                addrTypeKey,
                patronId,
                addrName,
                addrLn1,
                addrLn2,
                city,
                country,
                state,
                zip,
                addrPhone,
                email
            }));
        });

        return patronAddresses;
    }
  }