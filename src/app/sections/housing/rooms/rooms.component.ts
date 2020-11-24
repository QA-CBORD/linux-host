import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RoomsStateService } from './rooms-state.service';
import { Observable } from 'rxjs';
import { RoomSelect } from '@sections/housing/rooms/rooms.model';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'st-rooms',
  templateUrl: './rooms.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit{
  selections: RoomSelect[]
  hasLoaded$: Observable<boolean>;
  constructor(public roomsStateService: RoomsStateService,
              private _router: Router,
              private _activeRoute: ActivatedRoute) { }


  ngOnInit() {
    console.log('in rs');
    this.hasLoaded$ = this.roomsStateService.getRoomSelects().pipe(
      tap((data) => {
        this.selections = data;
      }),
      map(data => {
        return true;
      })
    )
    console.log(this.selections);
  }
  goToRoomSelection(key: any): void {
    this._router.navigate(['patron/housing/rooms-search', key]).then(() => {
      this.roomsStateService.setActiveRoomSelect(key);
    });
  }}
