import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MMobileLocationInfo } from '../../model/mobile-access.interface';

@Component({
    selector: 'app-location-item',
    templateUrl: './location-item.component.html',
    styleUrls: ['./location-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationItemComponent implements OnInit {
    @Input('location') location: MMobileLocationInfo;
    @Output('addToFav') addToFav: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    get starClass(): string {
        const empty = 'star-outline';
        const filled = 'star';
        return this.location.name.includes('153') ? filled : empty;
    }

    triggerFavourite() {
        this.addToFav.emit(this.location.locationId);
    }

    ngOnInit() {

    }

}
