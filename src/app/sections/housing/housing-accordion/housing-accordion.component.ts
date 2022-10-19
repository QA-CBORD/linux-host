import { Component,  EventEmitter, Input,  Output } from '@angular/core';

@Component({
  selector: 'st-housing-accordion',
  templateUrl: './housing-accordion.component.html',
  styleUrls: ['./housing-accordion.component.scss'],
})
export class HousingAccordionComponent {
  @Input() itemsAmount: number;
  @Input() newItemsAmount?: number;
  @Input() accordionTitle: number;
  @Input() showAddButton: number;
  @Output() onAddButtonClicked:EventEmitter<void> = new EventEmitter<void>()
  constructor() {}

  emitAddbutton(){
    this.onAddButtonClicked.emit();
  }
}
