import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  @Input() readonly: boolean = true;

  constructor() { }

  ngOnInit() {}

  onRemove($event: MouseEvent) {
    console.log($event)
  }
}
