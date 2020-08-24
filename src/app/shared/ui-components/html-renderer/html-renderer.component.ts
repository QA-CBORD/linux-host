import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'st-html-renderer',
  templateUrl: './html-renderer.component.html',
  styleUrls: ['./html-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HTMLRendererComponent implements OnInit {
  @Input() htmlContent: string;
  @Input() buttons: any[];

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdRef.markForCheck();
  }
}
