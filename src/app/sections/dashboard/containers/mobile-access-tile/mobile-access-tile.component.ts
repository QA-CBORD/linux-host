import { Component, OnInit } from '@angular/core';
import { MobileAccessService } from './services/mobile-access.service';
import { MMobileLocationInfo } from '@sections/dashboard/models';
import { Router } from '@angular/router';
import { NAVIGATE } from 'src/app/app.global';
import { LOCAL_ROUTING } from '@sections/mobile-access/mobile-acces.config';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'st-mobile-access-tile',
  templateUrl: './mobile-access-tile.component.html',
  styleUrls: ['./mobile-access-tile.component.scss'],
})
export class MobileAccessTileComponent implements OnInit {
  locations: MMobileLocationInfo[];
  showSpinner = true;

  constructor(private readonly mobileAccessService: MobileAccessService,
              private readonly nav2: NavController,
              private readonly router: Router) {
  }

  ngOnInit() {
    this.mobileAccessService.getLocations().pipe(
      take(1),
      map((locations) => locations.slice(0, 4)),
    ).subscribe((locations) => {
      this.locations = locations;
      this.showSpinner = false;
    });
  }

  navigateTo(locationId) {
    this.router.navigate([`/${NAVIGATE.mobileAccess}/${LOCAL_ROUTING.activate}/${locationId}`]);
  }
}
