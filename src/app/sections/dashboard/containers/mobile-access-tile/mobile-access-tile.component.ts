import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MobileAccessService } from './services/mobile-access.service';

@Component({
  selector: 'st-mobile-access-tile',
  templateUrl: './mobile-access-tile.component.html',
  styleUrls: ['./mobile-access-tile.component.scss'],
})
export class MobileAccessTileComponent implements OnInit {
  accessList = [];

  constructor(private readonly mobileAccessService: MobileAccessService) { }

  ngOnInit() {
    this.mobileAccessService
      .getLocations()
      .pipe(take(1))
      .subscribe(access => {
        this.accessList = access.slice(3);
      });
  }
}
