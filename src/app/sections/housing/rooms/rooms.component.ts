import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RoomsStateService } from './rooms-state.service';

@Component({
  selector: 'st-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent {
  constructor(public roomsStateService: RoomsStateService,
              private _router: Router,
              private _activeRoute: ActivatedRoute) { }
  goToRoomSelection(key: any): void {
    this._router.navigate(['/housing/rooms-search', key]).then(nav => {
      console.log(nav);
    }, err => {
      console.log(err);
    })
  }}
