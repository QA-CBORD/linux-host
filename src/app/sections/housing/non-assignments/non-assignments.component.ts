import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { NonAssignmentsStateService } from './non-assignments-state.service';

@Component({
  selector: 'st-non-assignments',
  templateUrl: './non-assignments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NonAssignmentsComponent {

  constructor(public nonAssignmentsStateService: NonAssignmentsStateService) { }

}
