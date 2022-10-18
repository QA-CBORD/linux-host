import { Component } from '@angular/core';
import { ModalsService } from '@core/service/modals/modals.service';

@Component({
  selector: 'st-items-unavailable',
  templateUrl: './items-unavailable.component.html',
  styleUrls: ['./items-unavailable.component.scss'],
})
export class ItemsUnavailableComponent {
  constructor(private readonly modalService: ModalsService) {}

  return = () => this.modalService.dismiss();
}
