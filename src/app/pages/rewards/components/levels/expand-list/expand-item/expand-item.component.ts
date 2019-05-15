import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'st-expand-item',
  templateUrl: './expand-item.component.html',
  styleUrls: ['./expand-item.component.scss', '../expand-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandItemComponent implements OnInit {
  show: boolean = false;
  @Input() levelInfo;
  @Output() onClickExpand: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private readonly cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  get levelClass(): string {
    const baseClass = 'progress__level';
    const passed = 'progress__level--passed';
    const active = 'progress__level--active';
    const modifier = this.levelInfo.status !== 'pending' && (this.levelInfo.status === 'active' ? active : passed);

    return `${baseClass} ${modifier || ''}`;
  }

  onExpandHandle() {
    this.onClickExpand.emit((this.show = !this.show) ? this.levelInfo.level : null);
  }

  closeExpand() {
    this.show = false;
    this.cdRef.detectChanges();
    console.log(1);
  }
}
