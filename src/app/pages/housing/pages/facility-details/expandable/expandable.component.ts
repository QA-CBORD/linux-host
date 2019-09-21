import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableComponent implements OnInit {
  @Input() expandHeight: any;

  @Input() isExpanded: any;

  currentHeight = 0;

  constructor() {}

  ngOnInit() {
    console.log(this.expandHeight);
    console.log(this.isExpanded);
  }
}
