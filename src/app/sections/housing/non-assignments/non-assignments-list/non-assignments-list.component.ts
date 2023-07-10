import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { isDefined } from '@sections/housing/utils';
import { PATRON_NAVIGATION } from 'src/app/app.global';

import {
  NonAssignmentFormStatus,
  NonAssignmentListDetails,
  NonAssignmentStatus
} from '../non-assignments.model';

@Component({
  selector: 'st-non-assignments-list',
  templateUrl: './non-assignments-list.component.html',
  styleUrls: ['../../applications/applications-list/applications-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonAssignmentsListComponent {
  @Input() nonAssignments: NonAssignmentListDetails[];

  getPath(key: number): string {
    return `${PATRON_NAVIGATION.housing}/non-assignments/${key}`;
  }

  trackById(_: number, nonAssignment: NonAssignmentListDetails): number {
    return nonAssignment.id;
  }

  canEdit(nonAssignment: NonAssignmentListDetails): boolean {
    const allowedStates = [
      NonAssignmentStatus.Active,
      NonAssignmentStatus.Preliminary
    ];
    return !isDefined(nonAssignment.acceptedDate)
      && !allowedStates.includes(NonAssignmentStatus[nonAssignment.status]);
  }

  getStatus(nonAssignment: NonAssignmentListDetails): string {
    const statusValue = this.getFormStatus(NonAssignmentStatus[nonAssignment.status]);

    const isCompleted =
      NonAssignmentStatus[nonAssignment.status] == NonAssignmentStatus.Active ||
      NonAssignmentStatus[nonAssignment.status] == NonAssignmentStatus.Preliminary;

    const formStatus = isDefined(nonAssignment.acceptedDate) && isCompleted
      ? NonAssignmentFormStatus[NonAssignmentStatus.Completed]
      : NonAssignmentFormStatus[statusValue];

    return formStatus;
  }

  private getFormStatus(state: NonAssignmentStatus): string {
    let formStatus;
    switch (state) {
      case NonAssignmentStatus.Completed:
        formStatus = NonAssignmentStatus.Completed;
        break;
      case NonAssignmentStatus.Suspended:
        formStatus = NonAssignmentStatus.Suspended;
        break;
      case NonAssignmentStatus.Canceled:
      case NonAssignmentStatus.Terminated:
        formStatus = NonAssignmentStatus.Terminated | NonAssignmentStatus.Canceled;
        break;
      case NonAssignmentStatus.Expired:
        formStatus = NonAssignmentStatus.Expired
        break;
      case NonAssignmentStatus.Active:
      case NonAssignmentStatus.Preliminary:
      default:
        formStatus = NonAssignmentStatus.Active | NonAssignmentStatus.Preliminary;
    }

    return formStatus;
  }
}
