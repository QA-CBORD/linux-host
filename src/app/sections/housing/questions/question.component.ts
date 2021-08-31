import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { QuestionBase, QuestionBaseOptionValue } from './types/question-base';
import { QuestionHeader } from './questions.model';
import { ApplicationsService } from '../applications/applications.service';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RequestedRoommateRequest, RequestedRoommate, RequestedRoommateResponse } from '../applications/applications.model';
import { LoadingService } from '../../../core/service/loading/loading.service';
import { HousingService } from '../housing.service';
import { TermsService } from '@sections/housing/terms/terms.service';
import { Observable, throwError, Subscription } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Component({
  selector: 'st-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit {
  constructor(private _changeDetector: ChangeDetectorRef,
    public _applicationsStateService: ApplicationsStateService,//TODO: delete
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _termService: TermsService
    ) {}


  ngOnInit(): void {
    this.roommateSearchOptions$ = this._applicationsStateService.roommateSearchOptions;
    this._initTermsSubscription();
    this._initGetRequestedRoommatesSubscription();
  }

  @Input() question: QuestionBase;

  @Input() name: string;

  @Input() parentGroup: FormGroup;

  @Input() isSubmitted: boolean;

  requestedRoommates$: Observable<RequestedRoommate[]>;
  roommateSearchOptions$: any;
  private selectedTermKey: number = 0;
  private subscriptions: Subscription = new Subscription();

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

  private _initTermsSubscription() {
    this.subscriptions.add(this._termService.termId$.subscribe(termId => this.selectedTermKey = termId));
  }

  private _initGetRequestedRoommatesSubscription() {
    const applicationDetails = this._applicationsStateService.applicationsState.applicationDetails;
    const patronRequests = applicationDetails.roommatePreferences
      .filter(x => x.patronKeyRoommate !== 0)
      .map(x => new RequestedRoommate({
        preferenceKey: x.preferenceKey,
        patronRoommateKey: x.patronKeyRoommate 
      }));

    const requestBody = new RequestedRoommateRequest({
      termKey: this.selectedTermKey,
      patronRequests
    });
    this._housingService.getRequestedRoommates(requestBody).pipe(
      map((data: RequestedRoommateResponse) => data.requestedRoommates.map(d => {
        const roommatePref = applicationDetails.roommatePreferences
          .find(f => f.patronKeyRoommate === d.patronRoommateKey
            && f.preferenceKey === d.preferenceKey);
        const requestedRoommateObj = new RequestedRoommate({
          firstName: roommatePref ? roommatePref.firstName : '',
          lastName: roommatePref ? roommatePref.lastName : '',
          preferenceKey: d.preferenceKey,
          patronRoommateKey: d.patronRoommateKey,
          confirmed: d.confirmed,
          middleName: d.middleName ? d.middleName : '',
          birthDate: d.birthDate,
          preferredName: d.preferredName ? d.preferredName :''
        });
        return requestedRoommateObj;
      }))).subscribe((data)=>{
        data.forEach((roommateRequest)=> {
          const requestRommateStateService = this._applicationsStateService.getRequestedRoommate()
          const isRequesteRommate = requestRommateStateService.find(request => request.preferenceKey === roommateRequest.preferenceKey )
          if(!isRequesteRommate){
            this._applicationsStateService.setRequestedRoommate(roommateRequest)
          }
        })
      })
  }
}
