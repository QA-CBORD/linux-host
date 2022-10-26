import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '@core/service/loading/loading.service';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import {
  RequestedRoommate,
  RequestedRoommateRequest,
  RequestedRoommateResponse,
  RoommateSearchOptions
} from '@sections/housing/applications/applications.model';
import { HousingService } from '@sections/housing/housing.service';
import { TermsService } from '@sections/housing/terms/terms.service';
import {
  Observable,
  Subscription,
  throwError
} from 'rxjs';
import {
  catchError,
  map,
  tap
} from 'rxjs/operators';
import { PATRON_NAVIGATION } from 'src/app/app.global';

export enum OptionsName {
  PreferredName = 'preferredName',
  FullName = 'fullName',
  FullNameDOB = 'fullNameDOB'
}
@Component({
  selector: 'st-search-by',
  templateUrl: './search-by.page.html',
  styleUrls: ['./search-by.page.scss'],
})
export class SearchByPage implements OnInit, OnDestroy {
  searchForm: FormGroup;
  searchOptions$: Observable<RoommateSearchOptions>;
  requestedRoommates$: Observable<RequestedRoommate[]>;
  
  private selectedTermKey = 0;
  private subscriptions: Subscription = new Subscription();
  
  constructor(
    private _router: Router,
    private _applicationStateService: ApplicationsStateService,
    private _loadingService: LoadingService,
    private _housingService: HousingService,
    private _termService: TermsService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      input1: new FormControl('', [Validators.required, Validators.minLength(1)]),
      input2: new FormControl('')
    });

    this.searchOptions$ = this._applicationStateService.roommateSearchOptions;
    this._initTermsSubscription();
    this._initGetRequestedRoommatesSubscription();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _initTermsSubscription() {
    this.subscriptions.add(this._termService.termId$.subscribe(termId => this.selectedTermKey = termId));
  }

  private _initGetRequestedRoommatesSubscription() {
    const applicationDetails = this._applicationStateService.applicationsState.applicationDetails;
    const requestedRoommates = this._applicationStateService.getRequestedRoommate();

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

    this._loadingService.showSpinner();
    this.requestedRoommates$ = this._housingService.getRequestedRoommates(requestBody).pipe(
      map((data: RequestedRoommateResponse) => data.requestedRoommates.map(d => {
        const roommatePref = applicationDetails.roommatePreferences
          .find(f => f.patronKeyRoommate === d.patronRoommateKey
            && f.preferenceKey === d.preferenceKey);

        return new RequestedRoommate({
          firstName: roommatePref ? roommatePref.firstName : '',
          lastName: roommatePref ? roommatePref.lastName : '',
          preferenceKey: d.preferenceKey,
          patronRoommateKey: d.patronRoommateKey,
          confirmed: requestedRoommates.some(roommate => {
            if(roommate.patronRoommateKey === d.patronRoommateKey && roommate.confirmed == true){
              return roommate.confirmed;
            }
            return d.confirmed
          }),
          middleName: d.middleName ? d.middleName : '',
          birthDate: d.birthDate,
          preferredName: d.preferredName ? d.preferredName :''
        });
      })),
      tap(() => {
        this._loadingService.closeSpinner();
      }),
      catchError((error: any) => {
        this._loadingService.closeSpinner();
        return throwError(error);
      })
    );
  }

  searchRoommates(options): void {
    const firstInput = this.searchForm.get('input1');
    const secondInput = this.searchForm.get('input2');
    
    let searchValue = `${firstInput.value}`;
    searchValue = secondInput.value !== '' ? `${searchValue},${secondInput.value}` : searchValue;

    const data: RoommateSearchOptions = {
      ...options,
      searchValue
    }

    this._applicationStateService.setRoommateSearchOptions(data);

    this._router.navigate([`${PATRON_NAVIGATION.housing}/roommates-search/results`], { skipLocationChange: true });
  }

  isApplicationSubmitted(){
    return this._applicationStateService.isSubmitted(this._applicationStateService.applicationsState.applicationDetails.applicationDefinition.key);
  }

  public get OptionsName(): typeof OptionsName {
    return OptionsName; 
  }
}
