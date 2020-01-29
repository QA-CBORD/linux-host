import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-buildings',
  templateUrl: './buildings.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingsPage {
  buildings = [];
}
