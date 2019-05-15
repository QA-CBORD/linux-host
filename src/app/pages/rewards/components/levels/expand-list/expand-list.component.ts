import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ExpandItemComponent } from './expand-item/expand-item.component';

@Component({
  selector: 'st-expand-list',
  templateUrl: './expand-list.component.html',
  styleUrls: ['./expand-list.component.scss'],
})
export class ExpandListComponent implements OnInit {
  @ViewChildren(ExpandItemComponent) children: QueryList<ExpandItemComponent>;
  mockData = mock;
  activeId: number = null;
  constructor() {}

  ngOnInit() {}

  onExpandHandler(id) {
    if (this.activeId && id !== null) this.closeExpand();
    this.activeId = id;
  }

  private closeExpand() {
    this.children.find(({ levelInfo: { level } }) => level === this.activeId).closeExpand();
  }
}

const mock = [
  {
    level: 1,
    levelName: 'YoungLine',
    status: 'climed',
  },
  {
    level: 2,
    levelName: 'Padawan',
    status: 'active',
  },
  {
    level: 3,
    levelName: 'Knight',
    status: 'pending',
  },
  {
    level: 4,
    levelName: 'Master',
    status: 'pending',
  },
];
