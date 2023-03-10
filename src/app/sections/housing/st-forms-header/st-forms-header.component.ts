import { HousingService } from '../housing.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'st-forms-header',
  templateUrl: './st-forms-header.component.html',
  styleUrls: ['./st-forms-header.component.scss']
})
export class StFormsHeaderComponent {
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
