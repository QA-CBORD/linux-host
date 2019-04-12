import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'st-header',
  templateUrl: './st-header.component.html',
  styleUrls: ['./st-header.component.scss'],
})
export class StHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() backButtonTitle: string = 'Back';
  @Output() onSearchedValue = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onInputChanged(event) {
    this.onSearchedValue.emit(event.target.value);
  }
}
