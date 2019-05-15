import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  tempArr = [
    {
      title: 'Carrot Cake2',
      description: 'A mediocre cake that you might enjoy this description is longer than the other one wee wooo',
    },
    {
      title: 'Carrot Cake3',
      description: 'A mediocre cake that you might enjoy this description is longer than the other one wee wooo',
    },
    {
      title: 'Carrot Cake4',
      description: 'A mediocre cake that you might enjoy this description is longer than the other one wee wooo',
    },
  ];

  tempActiveArr = [
    {
      title: 'Carrot Cake2',
      description: 'A mediocre cake that you might enjoy this description is longer than the other one wee wooo',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
