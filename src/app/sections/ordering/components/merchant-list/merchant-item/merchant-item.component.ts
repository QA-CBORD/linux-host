import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MerchantInfo } from '@sections/ordering/shared/models';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { EXPLORE_ROUTING } from '@sections/explore/explore.config';
import { PATRON_NAVIGATION } from 'src/app/app.global';
import { IonicModule } from '@ionic/angular';
import { OrderAheadBadgeComponent } from '@shared/order-ahead-badge/order-ahead-badge.component';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { OrderTypePipeModule } from '@sections/ordering/shared/pipes/order-type/order-type.module';
import { StopPropagationModule } from '@shared/directives/stop-propogation/stop-propagation.module';
import { OrderTypeDisplayComponent } from '@shared/order-type-display/order-type-display.component';
import { MerchantDistanceModule } from '@shared/pipes/merchant-distance/merchant-distance.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    NgIf,
    IonicModule,
    MerchantDistanceModule,
    OrderAheadBadgeComponent,
    StopPropagationModule,
    OrderTypePipeModule,
    OrderTypeDisplayComponent,
    RouterModule,
    TranslateModule
  ],
  selector: 'st-merchant-item',
  templateUrl: './merchant-item.component.html',
  styleUrls: ['./merchant-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MerchantItemComponent {
  @Input() merchantInfo: MerchantInfo;
  @Output() merchantClick: EventEmitter<MerchantInfo> = new EventEmitter<MerchantInfo>();
  @Output() addToFav: EventEmitter<{ isFavorite: boolean; id: string }> = new EventEmitter<{
    isFavorite: boolean;
    id: string;
  }>();
  awsImageUrl: string = this.environmentFacadeService.getImageURL();
  readonly merchantDetailsRoute = `/${PATRON_NAVIGATION.explore}/${EXPLORE_ROUTING.merchantDetails}/`;

  constructor(
    private readonly environmentFacadeService: EnvironmentFacadeService,
  ) {}

  get starClass(): string {
    const empty = 'star-outline';
    const filled = 'star-filled';
    const star = this.merchantInfo.isFavorite ? filled : empty;

    return `./assets/icon/${star}.svg`;
  }

  triggerMerchantClick(merchantInfo) {
    this.merchantClick.emit(merchantInfo);
  }

  triggerFavourite(event, { isFavorite, id }: MerchantInfo) {
    this.addToFav.emit({ isFavorite, id });
  }

}
