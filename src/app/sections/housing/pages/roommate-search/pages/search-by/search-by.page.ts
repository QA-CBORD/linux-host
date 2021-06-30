import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RoommateSearchOptions } from '@sections/housing/applications/applications.model';
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

  private subscriptions: Subscription = new Subscription();
  
  constructor(
    private _router: Router,
    private _applicationStateService: ApplicationsStateService)
  { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      input1: new FormControl(''),
      input2: new FormControl('')
    });

    this.searchOptions$ = this._applicationStateService.roommateSearchOptions;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  searchRoommates(): void {
    const firstInput = this.searchForm.get('input1');
    const secondInput = this.searchForm.get('input2');
    
    let searchValue = `${firstInput.value}`;
    searchValue = secondInput !== null ? `${searchValue},${secondInput .value}` : searchValue;

    this.subscriptions.add(this.searchOptions$.subscribe(data => {
      const options: RoommateSearchOptions = {
        ...data,
        searchValue
      }

      this._applicationStateService.setRoommateSearchOptions(options);
      this._router.navigate([`${PATRON_NAVIGATION.housing}/roommates-search/results`]);
    }));
  }

}
