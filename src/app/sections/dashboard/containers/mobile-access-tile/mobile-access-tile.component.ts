import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { MobileAccessService } from './services/mobile-access.service';
import { MMobileLocationInfo } from '@sections/dashboard/models';

@Component({
  selector: 'st-mobile-access-tile',
  templateUrl: './mobile-access-tile.component.html',
  styleUrls: ['./mobile-access-tile.component.scss'],
})
export class MobileAccessTileComponent implements OnInit {
  accessList: MMobileLocationInfo[] = [];
  showSpiner = true;

  constructor(private readonly mobileAccessService: MobileAccessService) { }

  ngOnInit() {
    this.mobileAccessService
      .getLocations()
      .pipe(take(1))
      .subscribe(locations => {
        this.accessList = locations.slice(0,4);
        this.showSpiner = false;
      });
      
  }
}
