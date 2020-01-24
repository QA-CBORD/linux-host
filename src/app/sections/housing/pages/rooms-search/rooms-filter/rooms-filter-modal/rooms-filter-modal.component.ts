import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'st-rooms-filter-modal',
  templateUrl: './rooms-filter-modal.component.html',
  styleUrls: ['./rooms-filter-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomsFilterModalComponent {}
