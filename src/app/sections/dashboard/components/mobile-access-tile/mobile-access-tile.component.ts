import { Component, OnInit } from '@angular/core';
import { MobileAccessService } from '../../services';
import { take } from 'rxjs/operators';

@Component({
  selector: 'st-mobile-access-tile',
  templateUrl: './mobile-access-tile.component.html',
  styleUrls: ['./mobile-access-tile.component.scss'],
})
export class MobileAccessTileComponent implements OnInit {
  accessList = [];

  constructor(private readonly mobileAccessService: MobileAccessService) {}

  ngOnInit() {
    this.mobileAccessService
      .getLocations()
      .pipe(take(1))
      .subscribe(access => {
        access.forEach(v => {
          if (v.isFavourite) {
            this.accessList.push(v);
          }
        });
      });
  }
}
