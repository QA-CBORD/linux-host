import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMoreComponent {
  toggled: boolean = false;
}
