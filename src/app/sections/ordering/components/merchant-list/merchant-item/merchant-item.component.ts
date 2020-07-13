import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MerchantInfo, MerchantOrderTypesInfo } from '@sections/ordering/shared/models';
import { Environment } from '../../../../../environment';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { ORDERING_CONTENT_STRINGS } from '@sections/ordering/ordering.config';
import { take } from 'rxjs/operators';

@Component({
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
  @Output() locationPin: EventEmitter<string> = new EventEmitter<string>();
  awsImageUrl: string = Environment.getImageURL();
  contentStrings: OrderingComponentContentStrings = <OrderingComponentContentStrings>{};

  constructor(private readonly orderingService: OrderingService) {
  }

  ngOnInit() {
    this.contentStrings.labelClosed = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelClosed);
    this.contentStrings.labelOpen = this.orderingService.getContentStringByName(ORDERING_CONTENT_STRINGS.labelOpen);
  }


  get starClass(): string {
    const empty = 'star-outline';
    const filled = 'star-filled';
    const star = this.merchantInfo.isFavorite ? filled : empty;

    return `./assets/icon/${star}.svg`;
  }

  triggerMerchantClick(merchantInfo) {
    this.merchantClick.emit(merchantInfo);
  }

  triggerFavourite(event, { isFavorite = null, id }: MerchantInfo) {
    this.addToFav.emit({ isFavorite, id });
  }

  triggerLocationPin(event, id) {
    this.locationPin.emit(id);
  }
}
