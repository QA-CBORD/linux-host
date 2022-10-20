import { Component, Input } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { OrderItem } from '@sections/ordering/shared';

@Component({
  selector: 'st-items-unavailable',
  templateUrl: './items-unavailable.component.html',
  styleUrls: ['./items-unavailable.component.scss'],
})
export class ItemsUnavailableComponent {
  @Input() public orderRemovedItems: OrderItem[] = [];
  constructor(private readonly modalService: ModalsService) {}

  return = () => this.modalService.dismiss();
  continue = () => this.modalService.dismiss(null, BUTTON_TYPE.CONTINUE);
}
