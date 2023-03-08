import { HousingService } from './../housing.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'st-form-details-header',
  templateUrl: './form-details-header.component.html',
  styleUrls: ['./form-details-header.component.scss']
})
export class FormDetailsHeaderComponent {
  @Output() onSave = new EventEmitter<Event>();
  @Input() showSave: boolean;

  constructor(private _housingService: HousingService) {}

  cancel() {
    this._housingService.goToDashboard();
  }

  save() {
    this.onSave.emit();
  }
}
