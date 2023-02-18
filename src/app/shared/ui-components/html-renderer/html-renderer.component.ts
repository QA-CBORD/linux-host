import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'st-html-renderer',
  templateUrl: './html-renderer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HTMLRendererComponent implements OnInit {
  @Input() title: string;
  @Input() htmlContent: Promise<string>;
  @Input() buttons: { label: string; callback: () => void }[];
  @Input() onClose: () => void;

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdRef.markForCheck();
  }
}
