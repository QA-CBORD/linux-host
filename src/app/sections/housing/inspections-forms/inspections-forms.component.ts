import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';

import { Inspection, Inspections } from './inspections-forms.model';
import { InspectionsStateService } from './inspections-forms-state.service';
import { TermsService } from '../terms/terms.service';
import { ROLES } from 'src/app/app.global';
import { InspectionService } from './inspections-forms.service';

@Component({
  selector: 'st-inspections-forms',
  templateUrl: './inspections-forms.component.html',
  styleUrls: ['./inspections-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  public urlEditForm: string;
  private selectedTermKey = 0;
  public inspectionList: BehaviorSubject<Inspections[]>;

  constructor(public _inspectionsStateService: InspectionsStateService,
    private _termService : TermsService,
    private _inspectionService: InspectionService
    ) {}

  inspections: Inspection[];

  ngOnInit() {
    this.inspectionList = this._inspectionsStateService.inspectionList$;
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

  getInspectionStatus(value: Inspections): string{
    if( value.isSubmitted == false && value.residentInspectionKey ){
      return 'IN PROGRESS'
    } else if(value.residentInspectionKey === 0 && value.isSubmitted === false){
      return 'NEW'
    }else if(value.isSubmitted) {
      return 'COMPLETED'
    }
        
  }

  getPath(inspection: Inspections): string {
    // eslint-disable-next-line no-extra-boolean-cast
    const url = !!inspection.residentInspectionKey? `${ROLES.patron}/housing/inspections/${this.selectedTermKey}/${inspection.residentInspectionKey}/${inspection.contractKey}/${inspection.checkIn}`: `${ROLES.patron}/housing/inspections/${this.selectedTermKey}/${inspection.contractKey}/${inspection.checkIn}`;
    return url;
  }

}
