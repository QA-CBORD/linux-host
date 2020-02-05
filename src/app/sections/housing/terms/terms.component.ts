import { Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { TermsService } from './terms.service';
import { LoadingService } from '../../../core/service/loading/loading.service';

import { Term } from './terms.model';

@Component({
  selector: 'st-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  terms$: Observable<Term[]>;

  label: string = 'Select Term';

  customPopoverOptions: any = {
    mode: 'md',
    showBackdrop: false,
  };

  constructor(private _termsService: TermsService, private _loadingService: LoadingService) {}

  ngOnInit() {
    this._loadingService.showSpinner();

    this.terms$ = this._termsService.getTerms().pipe(
      tap(() => this._loadingService.closeSpinner()),
      catchError((error: any) => {
        this._loadingService.closeSpinner();

        return throwError(error);
      })
    );
  }

  handleSelectTerm(term: Term): void {
    this.label = term.termName;

    this._termsService.setTermId(term.termId);
  }

  trackById(_: number, term: Term): number {
    return term.termId;
  }
}
