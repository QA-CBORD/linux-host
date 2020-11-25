import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { RoomSelect } from '@sections/housing/rooms/rooms.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'st-room-selection-list',
  templateUrl: './room-selection-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./room-selection-list.component.scss'],
})
export class RoomSelectionListComponent implements OnInit, AfterViewInit {
  @ViewChild('container') divContainer: ElementRef;
  @Input() roomSelects: RoomSelect[]

  ngOnInit() {
  }
 ngAfterViewInit() {
    //helps load ionList that doesnt load unless an event is fired
    this.divContainer.nativeElement.click();
 }

  constructor(public roomsStateService: RoomsStateService,
              private _router: Router,
              private _activeRoute: ActivatedRoute) {
  }

  goToRoomSelection(key: any): void {
    this._router.navigate(['patron/housing/rooms-search', key]).then(() => {
      this.roomsStateService.setActiveRoomSelect(key);
    });
  }
}
