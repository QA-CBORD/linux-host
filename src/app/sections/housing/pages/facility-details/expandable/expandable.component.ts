import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableComponent {
  @Input() expandHeight: any;

  @Input() isExpanded: any;

  currentHeight = 0;
}
