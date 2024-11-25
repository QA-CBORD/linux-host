import { Component,  EventEmitter, Input,  Output } from '@angular/core';

@Component({
  selector: 'st-housing-accordion',
  templateUrl: './housing-accordion.component.html',
  styleUrls: ['./housing-accordion.component.scss'],
})
export class HousingAccordionComponent {
  @Input() itemsAmount: number;
  @Input() accordionTitle: number;
  @Input() showAddButton: number;
  @Input() ignoreValidation?:boolean;
  @Output() onAddButtonClicked:EventEmitter<void> = new EventEmitter<void>()

  public amountMap = {
    '=1' : "# Item",
    other: "# Items"
  }


  emitAddbutton(){
    this.onAddButtonClicked.emit();
  }
}
