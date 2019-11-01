import { Component, OnInit, Input } from '@angular/core';
import { MenuGroupItemInfo } from '@sections/ordering/shared/models';

@Component({
  selector: 'st-multi-list',
  templateUrl: './multi-list.component.html',
  styleUrls: ['./multi-list.component.scss'],
})
export class MultiListComponent implements OnInit {

  @Input() name: string;
  @Input() options: MenuGroupItemInfo[];
  constructor() { }

  ngOnInit() { }

  onItemsChecked(event) {
    console.log(event);
  }
}
