import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { HousingProxyService } from '../housing-proxy.service';
import { HousingAuthService } from '../housing-auth/housing-auth.service';

import { generateTerms } from './terms.mock';

import { Term } from './terms.model';

@Injectable({
  providedIn: 'root',
})
export class TermsService {
  constructor(private _housingProxyService: HousingProxyService) {}

  getTerms(): Observable<Term[]> {
    const apiUrl: string = `/api/patrons/v.1.0/patrons/terms?patronId=${HousingAuthService.patronId}`;

    return this._housingProxyService.get<Term[]>(apiUrl).pipe(
      map((terms: any[]) => (Array.isArray(terms) ? terms.map((term: any) => new Term(term)) : [])),
      catchError(() => of(generateTerms()))
    );
  }
}
