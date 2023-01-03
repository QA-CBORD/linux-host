import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import {
  RequestedRoommate,
  RoommateSearchOptions,
} from '@sections/housing/applications/applications.model';
import { LOCAL_ROUTING } from '@sections/housing/housing.config';
import { Observable, take } from 'rxjs';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { RequestedRoommatesComponent } from './requested-roommates/requested-roommates.component';

const REGEX_ALPHANUMERIC = `^[a-zA-Z0-9'-]*$`;
@Component({
  selector: 'st-search-by',
  templateUrl: './search-by.page.html',
  styleUrls: ['./search-by.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchByPage implements OnInit {
  searchForm: FormGroup;
  searchOptions$: Observable<RoommateSearchOptions>;
  requestedRoommates$: Observable<RequestedRoommate[]>;
  firstInputName = 'first';
  secondInputName = 'second';
  searchOption: string;

  errorMessages = {
    required: 'This field is required',
    numeric: 'This field should be numeric',
    integer: 'This field should be integer',
    string: 'This field should be string',
  };
  options: RoommateSearchOptions;
  requestedRoommates: RequestedRoommate[];
  @ViewChild(RequestedRoommatesComponent, { static: false }) requestedRoommatesComponent: RequestedRoommatesComponent;

  constructor(
    private _router: Router,
    private _applicationStateService: ApplicationsStateService,
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit() {
    this._applicationStateService.roommateSearchOptions.pipe(take(1)).subscribe(options => {
      this.options = options;
    });

    if (this.options.searchOptions == "byPartialLastFirst" || this.options.searchOptions == "byPartialPreferredFirstLast") {
      this.searchForm = this.fb.group({
        [this.firstInputName]: ['', [Validators.required, Validators.pattern(REGEX_ALPHANUMERIC)]],
        [this.secondInputName]: ['', [Validators.required, Validators.pattern(REGEX_ALPHANUMERIC)]],
      });
    } else {
      this.searchForm = this.fb.group({
        [this.firstInputName]: ['', [Validators.required]]
      });
    }

    this.searchForm.updateValueAndValidity();
  }
 
  ionViewWillEnter() {
    this.requestedRoommatesComponent.updateRequestedRoommates();
  }

  searchRoommates(options: RoommateSearchOptions) {
    if (!this.searchForm.valid) {
      return;
    }
    const firstInput = this.firstInput;
    const secondInput = this.secondInput;

    let searchValue = `${firstInput.value}`;
    searchValue = secondInput?.value !== '' ? `${searchValue},${secondInput?.value}` : searchValue;

    const data: RoommateSearchOptions = {
      ...options,
      searchValue,
    };

    this._applicationStateService.setRoommateSearchOptions(data);
    this._router.navigate([`${PATRON_NAVIGATION.housing}/${LOCAL_ROUTING.roommatesSearchResult}`]);
  }

  isApplicationSubmitted() {
    return this._applicationStateService.isSubmitted(
      this._applicationStateService.applicationsState.applicationDetails.applicationDefinition.key
    );
  }

  get firstInput() {
    return this.searchForm.get(this.firstInputName);
  }

  get secondInput() {
    return this.searchForm.get(this.secondInputName);
  }

  public errorValidator(control: AbstractControl) {
    return !control?.valid && control?.touched && !control?.disabled;
  }
}
