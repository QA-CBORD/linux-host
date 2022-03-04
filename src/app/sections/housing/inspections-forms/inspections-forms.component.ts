import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Inspection } from './inspections-forms.model';
import { InspectionsStateService } from './inspections-forms-state.service';
import { TermsService } from '../terms/terms.service';
import { ROLES } from 'src/app/app.global';

@Component({
  selector: 'st-inspections-forms',
  templateUrl: './inspections-forms.component.html',
  styleUrls: ['./inspections-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public urlEditForm: string;
  private selectedTermKey: number = 0;

  constructor(public _inspectionsStateService: InspectionsStateService,
    private _termService : TermsService
    ) {}

  inspections: Inspection[];

  ngOnInit() {
    const inspectionsListSubscription: Subscription = this._inspectionsStateService.inspectionList$
      .subscribe();

    this._initTermsSubscription();
    this._subscription.add(inspectionsListSubscription);
  }

  private _initTermsSubscription() {
    this._subscription.add(
      this._termService.termId$
          .subscribe(termId => {
            this.urlEditForm = `/patron/housing/inspections/${termId}/`;
            this.selectedTermKey = termId;
          }));
    
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  getStatus(key: number): string {
    if (key || key !== 0) {
      return 'Submitted'
    }

    return 'New';
  }

  getPath(residentInspectionKey: number, contractElementKey: number, checkIn: boolean): string {
    return `${ROLES.patron}/housing/inspections/${this.selectedTermKey}/${residentInspectionKey}/${contractElementKey}/${checkIn}`;
  }

}
