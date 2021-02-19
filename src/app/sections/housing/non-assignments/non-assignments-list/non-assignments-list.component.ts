import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';

import { isDefined } from '@sections/housing/utils';
import { PATRON_NAVIGATION } from 'src/app/app.global';

import { NonAssignmentListDetails } from '../non-assignments.model';

@Component({
  selector: 'st-non-assignments-list',
  templateUrl: './non-assignments-list.component.html',
  styleUrls: ['../../applications/applications-list/applications-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonAssignmentsListComponent implements OnInit {
  @Input() nonAssignments: NonAssignmentListDetails[];

  constructor() { }

  ngOnInit() {}

  getPath(key: number): string {
    return `${PATRON_NAVIGATION.housing}/non-assignments/${key}`;
  }

  trackById(_: number, nonAssignment: NonAssignmentListDetails): number {
    return nonAssignment.id;
  }

  canEdit(nonAssignment: NonAssignmentListDetails): boolean {
    const allowedStates = [];
    return false;
    // return !isDefined(nonAssignment.acceptedDate);
      //&& allowedStates.includes(Status[nonAssignment.state]);
  }

  getStatus(nonAssignment: NonAssignmentListDetails): string {
    //const statusValue = this._getFormStatus();

    //const isCompleted = 

    // const formStatus = isDefined(nonAssignment)
    return "TODO";
  }
}
