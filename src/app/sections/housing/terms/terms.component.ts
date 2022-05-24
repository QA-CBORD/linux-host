import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { TermsService } from './terms.service';
import { LoadingService } from '@core/service/loading/loading.service';

import { Term } from './terms.model';

@Component({
  selector: 'st-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsComponent implements OnInit {
  terms$: Observable<Term[]>;

  label = 'Select Term';

  customPopoverOptions: any = {
    mode: 'md',
    showBackdrop: false,
  };

  constructor(private _termsService: TermsService, private _loadingService: LoadingService) {}

  ngOnInit() {
    this._loadingService.showSpinner();

    this.terms$ = this._termsService.getTerms().pipe(tap(() => this._loadingService.closeSpinner()));
  }

  handleSelectTerm(term: Term): void {
    this.label = term.termName;

    this._termsService.setTermId(term.termId);
  }

  trackById(_: number, term: Term): number {
    return term.termId;
  }
}
