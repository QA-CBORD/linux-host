import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Color } from '@ionic/core';

@Component({
  selector: 'st-alert-banner',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './st-alert-banner.component.html',
  styleUrls: ['./st-alert-banner.component.scss'],
})
export class StAlertBannerComponent {
  iconScr: string;

  @Input() text: string;
  @Input() color: Color = 'light';
  @Input() icon: string;
  @Input('iconScr') set _iconScr(iconScr: 'caution') {
    this.iconScr = `/assets/icon/${iconScr}.svg`;
  }
}
