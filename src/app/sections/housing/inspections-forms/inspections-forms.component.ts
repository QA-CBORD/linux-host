import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Inspection, Inspections } from './inspections-forms.model';
import { InspectionsStateService } from './inspections-forms-state.service';
import { TermsService } from '../terms/terms.service';
import { ROLES } from 'src/app/app.global';
import { take } from 'rxjs/operators';

const InspectionStatus = {
  0: "NEW",
  1: "IN PROGRESS",
  2: "SUBMITTED",
  3: "INCOMPLETE"
};

const InspectionColorHex = {
  0: "#D47B07", // "NEW"
  1: "#D47B07", // "IN PROGRESS",
  2: "#41A35E", // "SUBMITTED",
  3: "#EB6669" // "INCOMPLETE"
};

const InspectionColorClass = {
  0: "new", 
  1: "in-progress", 
  2: "submitted", 
  3: "incomplete" 
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

  constructor(private _inspectionsStateService: InspectionsStateService, private _termService: TermsService) {}

  ngOnInit() {
    this._initTermsSubscription();
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
      ? `${ROLES.patron}/housing/inspections/${this.selectedTermKey}/${inspection.residentInspectionKey}/${
          inspection.contractKey
        }/${inspection.checkIn}`
      : `${ROLES.patron}/housing/inspections/${this.selectedTermKey}/${inspection.contractKey}/${inspection.checkIn}`;
  }

  get inspectionList$(): BehaviorSubject<Inspections[]> {
    return this._inspectionsStateService.inspectionList$;
  }

  private _initTermsSubscription() {
    this._termService.termId$.pipe(take(1)).subscribe(termId => {
      this.urlEditForm = `/patron/housing/inspections/${termId}/`;
      this.selectedTermKey = termId;
    });
  }
}