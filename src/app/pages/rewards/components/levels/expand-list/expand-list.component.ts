import { ChangeDetectionStrategy, Component, Input, QueryList, ViewChildren } from '@angular/core';

import { ExpandItemComponent } from './expand-item';
import { UserTrackLevelInfo } from '../../../models';

@Component({
  selector: 'st-expand-list',
  templateUrl: './expand-list.component.html',
  styleUrls: ['./expand-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandListComponent {
  @ViewChildren(ExpandItemComponent) children: QueryList<ExpandItemComponent>;
  @Input() levels: UserTrackLevelInfo[];
  @Input() currentLevel: number;
  level: number = null;

  onExpandHandler(level: number) {
    if (this.level && level !== null) this.closeExpand();
    this.level = level;
  }

  trackFn(index, {level}: UserTrackLevelInfo): number {
    return level;
  }

  private closeExpand() {
    this.children.find(({ levelInfo: { level } }) => level === this.level).closeExpand();
  }
}