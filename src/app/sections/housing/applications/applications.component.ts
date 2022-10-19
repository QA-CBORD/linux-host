import { Component, ChangeDetectionStrategy } from '@angular/core';
import { map, take } from 'rxjs';

import { ApplicationsStateService } from './applications-state.service';

@Component({
  selector: 'st-applications',
  templateUrl: './applications.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationsComponent {
  constructor(public applicationsStateService: ApplicationsStateService) {}
  get newItemsAumount() {
    let newItemsLength: number;
    this.applicationsStateService.applications$
      .pipe(
        take(1),
        map(item => item.filter(x => !x.patronApplication))
      )
      .subscribe({
        next: newItems => {
          newItemsLength = newItems.length;
        },
      });
    return newItemsLength;
  }
}
