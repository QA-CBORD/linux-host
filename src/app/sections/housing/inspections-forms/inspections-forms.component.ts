import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Inspection, Inspections } from './inspections-forms.model';
import { InspectionsStateService } from './inspections-forms-state.service';
import { TermsService } from '../terms/terms.service';
import { ROLES } from 'src/app/app.global';

const InspectionStatus = {
  0: 'NEW',
  1: 'IN PROGRESS',
  2: 'SUBMITTED',
  3: 'INCOMPLETE',
  4: 'ADMIN COMPLETED',
};

const InspectionColorHex = {
  0: '#D47B07',
  1: '#D47B07',
  2: '#0B8640',
  3: '#EB6669',
  4: '#3A3B3C',
};

const InspectionColorClass = {
  0: 'new',
  1: 'in-progress',
  2: 'submitted',
  3: 'incomplete',
  4: 'admin-completed',
};

@Component({
  selector: 'st-inspections-forms',
  templateUrl: './inspections-forms.component.html',
  styleUrls: ['./inspections-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InspectionsComponent implements OnInit {
  private selectedTermKey = 0;
  inspections: Inspection[];
  urlEditForm: string;
  private subscription: Subscription;
  
  roomsMap= {
    '=1' : "# Room Left",
    other: "# Rooms Left"
  }

  constructor(private _inspectionsStateService: InspectionsStateService, private _termService: TermsService) {}

  ngOnInit() {
    this._initTermsSubscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getInspectionStatus(value: Inspections): string {
    return InspectionStatus[value.status];
  }

  getInspectionColor(value: Inspections): string {
    return InspectionColorHex[value.status];
  }

  getInspectionLineColor(value: Inspections): string {
    return InspectionColorClass[value.status];
  }

  getUrlPath(inspection: Inspections): string {
    return inspection.residentInspectionKey
      ? `${ROLES.patron}/housing/inspections/${this.selectedTermKey}/${inspection.residentInspectionKey}/${inspection.contractKey}/${inspection.status}/${inspection.checkIn}`
      : `${ROLES.patron}/housing/inspections/${this.selectedTermKey}/${inspection.contractKey}/${inspection.status}/${inspection.checkIn}`;
  }

  get inspectionList$(): BehaviorSubject<Inspections[]> {
    return this._inspectionsStateService.inspectionList$;
  }

  private _initTermsSubscription() {
    this.subscription = this._termService.termId$.subscribe(termId => {
      this.urlEditForm = `/patron/housing/inspections/${termId}/`;
      this.selectedTermKey = termId;
    });
  }

  canEdit(inspection: Inspections){
    return inspection.status <= 1
  }
}
