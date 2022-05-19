import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RoomSelect } from '@sections/housing/rooms/rooms.model';
import { RoomsStateService } from '@sections/housing/rooms/rooms-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { hasDatePassed } from '@sections/housing/utils/has-date-passed';
import { ToastService } from '@core/service/toast/toast.service';

@Component({
  selector: 'st-room-selection-list',
  templateUrl: './room-selection-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./room-selection-list.component.scss'],
})
export class RoomSelectionListComponent implements AfterViewInit {
  @ViewChild('container') divContainer: ElementRef;
  @Input() roomSelects: RoomSelect[]

 ngAfterViewInit() {
    //helps load ionList that doesnt load unless an event is fired
   if(this.roomSelects.length > 0)
    this.divContainer.nativeElement.click();
 }

  constructor(public roomsStateService: RoomsStateService,
              private _router: Router,
              private _activeRoute: ActivatedRoute,
              private _toastService: ToastService) {
  }

  goToRoomSelection(key: any): void {
    const roomSelection: RoomSelect = this.roomSelects.find(x => x.key === key);
    if(hasDatePassed(roomSelection.accessTime) && !hasDatePassed(roomSelection.accessEnd)) {
    this._router.navigate(['patron/housing/rooms-search', key]).then(() => {
      this.roomsStateService.setActiveRoomSelect(key);
    });
    }
    else {
      this._toastService.showToast({message: 'Your access time has not been reached yet.'});
    }

  }
}
