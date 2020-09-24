import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'st-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  @Input() defaultHref: string;

  @Input() text: string = 'Back';
}
