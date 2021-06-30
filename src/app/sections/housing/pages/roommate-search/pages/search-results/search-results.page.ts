import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@core/service/loading/loading.service';
import { ApplicationsService } from '@sections/housing/applications/applications.service';
import { HousingService } from '@sections/housing/housing.service';

@Component({
  selector: 'st-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {

  constructor(
    private _housingService: HousingService,
    private _loadingService: LoadingService,
    private _applicationService: ApplicationsService
  ) { }

  ngOnInit() {
    this._loadingService.showSpinner();
    console.log('navigated');
    this._loadingService.closeSpinner();
  }

}
