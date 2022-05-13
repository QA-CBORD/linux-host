import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { RoomsStateService } from './rooms-state.service';

@Component({
  selector: 'st-rooms',
  templateUrl: './rooms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent {
  constructor(public roomsStateService: RoomsStateService) {}
}
