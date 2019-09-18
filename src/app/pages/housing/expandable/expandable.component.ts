import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {

  @Input('expandHeight') expandHeight;
  @Input('isExpanded') isExpanded;
  currentHeight = 0;

  constructor() { }

  ngOnInit() {
    console.log(this.expandHeight);
    console.log(this.isExpanded);
  }

}
