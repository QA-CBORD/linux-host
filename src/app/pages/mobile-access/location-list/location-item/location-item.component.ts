import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

import { MMobileLocationInfo } from '../../model/mobile-access.interface';

@Component({
  selector: 'st-location-item',
  templateUrl: './location-item.component.html',
  styleUrls: ['./location-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationItemComponent {
  @Input('location') location: MMobileLocationInfo;
  @Output('addToFav') addToFav: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router: Router, private nav2: NavController) {}

  get starClass(): string {
    const empty = 'star-outline';
    const filled = 'star-filled';
    const star = this.location.name.includes('153') ? filled : empty;

    return `./assets/icon/${star}.svg`;
  }

  openLocation() {
    this.nav2.navigateForward(`/mobile-access/activate/${this.location.locationId}`);
  }

  triggerFavourite() {
    this.addToFav.emit(this.location.locationId);
  }
}
