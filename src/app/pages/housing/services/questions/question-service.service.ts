import { Injectable } from '@angular/core';
import { QuestionDetails } from '../../Models/questionDetail';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  getQuestions(applicationId: number) {
    // Hit RC to get the list of questions for this particular application ID
    const json = `
    [
      {
        "type": "text",
        "label": "Name",
        "className": "form-control",
        "name": "text-1559676185047",
        "subtype": "text",
        "required": "true",
        "order": "1",
        "placeholder": ""
      },
      {
        "type": "text",
        "subtype": "password",
        "label": "SS #",
        "className": "form-control",
        "name": "text-1559676203712",
        "required": "true",
        "order": "2",
        "placeholder":""
      },
      {
        "type": "select",
        "label": "Year:",
        "className": "form-control",
        "name": "select-1559676230181",
        "required": "false",
        "order": "3",
        "values": [
          {
            "label": "Freshman",
            "value": "1",
            "selected": true
          },
          {
            "label": "Sophomore",
            "value": "2"
          },
          {
            "label": "Junior",
            "value": "3"
          },
          {
            "label": "Senior",
            "value": "4"
          }
        ]
      },
      {
        "type": "textarea",
        "required": true,
        "label": "Tell us about your experience last semester",
        "placeholder": "",
        "className": "form-control",
        "name": "textarea-1559676349168",
        "subtype": "textarea",
        "maxlength": "50",
        "rows": "5",
        "cols": "12",
        "order": "4"
      },
      {
        "type": "reorder",
        "required": "false",
        "label": "Choose your top 2 housing preference:",
        "class-name": "form-control",
        "name": "reorder-1559676349169",
        "order": "5",
        "showFacilityList":"1",
        "preferenceCount":"2",
        "values":
        [
          {
            "name":"Anderson and Peterson hall",
            "preference":""
          },
          {
            "name":"Austin residence complex",
            "preference":""
          },
          {
            "name":"Slytherin",
            "preference":""
          },
          {
            "name":"Hufflepuff",
            "preference":""
          }
        ]
      }
    ]`;

    return this._toModel(json);
  }

  private _toModel(jsonData: string): QuestionDetails[] {
    const questions: QuestionDetails[] = [];
    const object = JSON.parse(jsonData);

    object.map(ques => {
      questions.push(new QuestionDetails(ques));
    });

    return questions;
  }
}
