import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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
  selectedTermLabel$: Observable<string>;

  customPopoverOptions = {
    mode: 'md',
    showBackdrop: false,
  };

  @Input() disabled = false;

  constructor(private _termsService: TermsService, private _loadingService: LoadingService) {}

  ngOnInit() {
    this._loadingService.showSpinner();

    this.terms$ = this._termsService.getTerms().pipe(tap(() => this._loadingService.closeSpinner()));

    this.selectedTermLabel$ = this._termsService.termlabel$;
  }

  handleSelectTerm(term: Term): void {
    this._termsService.setTerm(term);
  }

  trackById(_: number, term: Term): number {
    return term.key;
  }
}
