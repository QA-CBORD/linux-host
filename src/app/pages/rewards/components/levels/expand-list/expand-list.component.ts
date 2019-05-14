import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-expand-list',
  templateUrl: './expand-list.component.html',
  styleUrls: ['./expand-list.component.scss'],
})
export class ExpandListComponent implements OnInit {
  mockData = mock;
  constructor() {
  }

  ngOnInit() {
  }

}

const mock = [
  {
    level: 1,
    levelName: 'YoungLine',
    status: 'climed',
  }, {
    level: 2,
    levelName: 'Padawan',
    status: 'active',
  }, {
    level: 3,
    levelName: 'Knight',
    status: 'pending',
  }, {
    level: 4,
    levelName: 'Master',
    status: 'pending',
  }];