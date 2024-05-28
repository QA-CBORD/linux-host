import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';
import { BUTTON_TYPE } from '@core/utils/buttons.config';
import { OrderItem } from '@sections/ordering/shared';
import { IonicModule } from '@ionic/angular';
import { OrderItemDetailsModule } from '../order-item-details/order-item-details.module';

@Component({
  imports: [IonicModule, CommonModule, OrderItemDetailsModule],
  selector: 'st-items-unavailable',
  templateUrl: './items-unavailable.component.html',
  styleUrls: ['./items-unavailable.component.scss'],
  standalone: true,
})
export class ItemsUnavailableComponent {
  @Input() public orderRemovedItems: OrderItem[] = [];
  @Input() public mealBased: boolean;

  constructor(private readonly modalService: ModalsService) {}

  return = () => this.modalService.dismiss();
  continue = () => this.modalService.dismiss(null, BUTTON_TYPE.CONTINUE);
}
