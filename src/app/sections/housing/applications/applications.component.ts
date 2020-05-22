import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ApplicationsStateService } from './applications-state.service';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent {
  constructor(public applicationsStateService: ApplicationsStateService) {}
}
