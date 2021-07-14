import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { Observable, Subscription } from 'rxjs';
import { PATRON_NAVIGATION } from 'src/app/app.global';

@Component({
  selector: 'st-search-by',
  templateUrl: './search-by.page.html',
  styleUrls: ['./search-by.page.scss'],
})
export class SearchByPage implements OnInit, OnDestroy {
  searchForm: FormGroup;
  searchOptions$: Observable<RoommateSearchOptions>;
  requestedRoommates$: Observable<RequestedRoommate[]>;

  private subscriptions: Subscription = new Subscription();
  
  constructor(
    private _router: Router,
    private _applicationStateService: ApplicationsStateService,
    private _loadingService: LoadingService,
    private _housingService: HousingService)
  { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      input1: new FormControl('', [Validators.required, Validators.minLength(1)]),
      input2: new FormControl('')
    });

    this.searchOptions$ = this._applicationStateService.roommateSearchOptions;
    this._initGetRequestedRoommates();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _initGetRequestedRoommates() {
    const applicationDetails = this._applicationStateService.applicationsState.applicationDetails;
    console.log('state');
    //const body = new RequestedRoommateRequest();
    //this.requestedRoommates$ = this._housingService.getRequestedRoommates(null);
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

    this._router.navigate([`${PATRON_NAVIGATION.housing}/roommates-search/results`]);
  }

}
