import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';

import { Inspection, Inspections } from './inspections-forms.model';
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
  public inspectionList: BehaviorSubject<Inspections[]>;

  constructor(public _inspectionsStateService: InspectionsStateService,
    private _termService : TermsService
    ) {}

  inspections: Inspection[];

  ngOnInit() {
    this.inspectionList = this._inspectionsStateService.inspectionList$;
    console.log("valueee-->",this._inspectionsStateService.inspectionList$.subscribe(res => console.log(res)) )
    const inspectionsForm: Subscription = this._inspectionsStateService.inspectionForm$
      .subscribe();

    this._initTermsSubscription();
    this._subscription.add(inspectionsForm);
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
    return residentInspectionKey? `${ROLES.patron}/housing/inspections/${this.selectedTermKey}/${residentInspectionKey}/${contractElementKey}/${checkIn}`: `${ROLES.patron}/housing/inspections/${this.selectedTermKey}/${contractElementKey}/${checkIn}`;
  }

}
