import { Component, Input } from '@angular/core';

@Component({
  selector: 'st-spinner',
  templateUrl: './st-spinner.component.html',
  styleUrls: ['./st-spinner.component.scss'],
})
export class StSpinnerComponent {
  @Input('refreshText') refreshText = '';
}
