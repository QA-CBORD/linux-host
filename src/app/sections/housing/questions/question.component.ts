import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { QuestionBase, QuestionBaseOptionValue } from './types/question-base';
import { QuestionHeader } from './questions.model';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RequestedRoommate } from '../applications/applications.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit {
  constructor(private _changeDetector: ChangeDetectorRef,
    public _applicationsStateService: ApplicationsStateService,//TODO: delete
    ) {}


  ngOnInit(): void {
    this._applicationsStateService.roommateSearchOptions.subscribe(
      data => { 
        this.options = data; 
      }
    )
  }

  @Input() question: QuestionBase;

  @Input() name: string;

  @Input() parentGroup: FormGroup;

  @Input() isSubmitted: boolean;

  requestedRoommates$: Observable<RequestedRoommate[]>;
  options: any;

  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  errorMessages: any = {
    required: 'This field is required',
    numeric: 'This field should be numeric',
    integer: 'This field should be integer',
    string: 'This field should be string',
  };

  createHeader(question: QuestionHeader): string {
    const headerWeight: number = parseInt(question.subtype, 10);
    const headerCssClass: string =
      headerWeight > 1 ? 'question__secondary-header ion-text-uppercase' : 'question__primary-header';

    return `<${question.subtype} class="${headerCssClass}">${question.label}</${question.subtype}>`;
  }

  check(): void {
    this._changeDetector.markForCheck();
  }

  touch(): void {
    const controls: { [key: string]: AbstractControl } = this.parentGroup.controls;

    Object.keys(controls).forEach((controlName: string) => {
      controls[controlName].markAsTouched();
      controls[controlName].markAsDirty();
    });

    this.check();
  }

  trackByLabel(_: number, option: QuestionBaseOptionValue): string {
    return option.label;
  }
}
