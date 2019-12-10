import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TermsService } from './terms.service';

import { Term } from './terms.model';

@Component({
  selector: 'st-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  terms$: Observable<Term[]>;

  customPopoverOptions: any = {
    mode: 'md',
  };

  constructor(private _termsService: TermsService) {}

  ngOnInit() {
    this.terms$ = this._termsService.getTerms();
  }

  selectTerm($event: any): void {
    console.log('event ', $event);
  }
}
