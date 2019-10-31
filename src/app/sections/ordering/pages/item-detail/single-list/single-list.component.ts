import { Component, OnInit, Input } from '@angular/core';
import { MenuGroupItemInfo } from '@sections/ordering/shared/models';
@Component({
  selector: 'st-single-list',
  templateUrl: './single-list.component.html',
  styleUrls: ['./single-list.component.scss'],
})
export class SingleListComponent implements OnInit {

  @Input() name: string;
  @Input() options: MenuGroupItemInfo[];
  constructor() { }

  ngOnInit() { }

  itemChosen(event) {
    console.log(event)
  }
}
