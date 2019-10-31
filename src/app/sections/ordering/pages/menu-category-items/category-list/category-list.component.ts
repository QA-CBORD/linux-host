import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'st-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {

  @Input() menuCategoryItems;
  @Output() onItemClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() { }

  triggerMenuItemClick({ id }) {
    this.onItemClicked.emit(id);
  }
}
