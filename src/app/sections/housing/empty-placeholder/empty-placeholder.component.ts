import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'st-empty-placeholder',
  templateUrl: './empty-placeholder.component.html',
  styleUrls: ['./empty-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyPlaceholderComponent {
  @Input() src: string;

  @Input() text: string;
}
