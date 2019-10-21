import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-appertizer-list',
  templateUrl: './appertizer-list.component.html',
  styleUrls: ['./appertizer-list.component.scss'],
  
})
export class AppertizerListComponent implements OnInit {

  searchState: boolean = false;

  constructor() { }

  ngOnInit() {}

}
