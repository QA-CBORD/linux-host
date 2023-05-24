import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { MMobileLocationInfo } from '../../model';
import { PATRON_NAVIGATION } from '../../../../app.global';
import { LOCAL_ROUTING } from '../../mobile-acces.config';

@Component({
  selector: 'st-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationItemComponent {
  @Input() location: MMobileLocationInfo;
  @Output() addToFav: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private nav2: NavController) {}

  get starClass(): string {
    const empty = 'star-outline';
    const filled = 'star-filled';
    const star = this.location.isFavourite ? filled : empty;

    return `./assets/icon/${star}.svg`;
  }

  get starAriaLabel(): string {
    return this.location.isFavourite ? `Favourite checked` : 'Favourite unchecked';
  }

  openLocation() {
    this.nav2.navigateForward(`/${PATRON_NAVIGATION.mobileAccess}/${LOCAL_ROUTING.activate}/${this.location.locationId}`);
  }

  triggerFavourite() {
    this.addToFav.emit(this.location.locationId);
  }
}
