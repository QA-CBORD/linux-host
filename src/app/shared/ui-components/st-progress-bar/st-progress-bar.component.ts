import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'st-progress-bar',
  templateUrl: './st-progress-bar.component.html',
  styleUrls: ['./st-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StProgressBarComponent implements OnInit {
  @Input('level') level: number;
  @Input('levelName') levelName: string;
  @Input('max') max: number;
  @Input('current') current: number;

  constructor() {}

  get width(): WidthObject {
    const percent = `${(this.current / this.max) * 100}%`;
    return { width: percent };
  }

  ngOnInit() {}
}

type WidthObject = { width: string };
