import { Component, Input } from '@angular/core';
import { Color } from '@ionic/core';

@Component({
  selector: 'st-alert-banner',
  templateUrl: './st-alert-banner.component.html',
  styleUrls: ['./st-alert-banner.component.scss'],
})
export class StAlertBannerComponent {
  @Input() text: string;
  @Input() color: Color;
}
