import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'st-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {

  @Input() menuCategoryItems;

  constructor() { }

  ngOnInit() {}

  triggerMenuItemClick(event) {
    console.log(event);
    
  }
}
