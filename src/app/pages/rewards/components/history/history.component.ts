import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
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
  constructor() {}

  ngOnInit() {}
}
