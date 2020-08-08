import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { SettingItemConfig } from '@sections/settings/models/setting-items-config.model';

@Component({
  selector: 'st-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.scss'],
})
export class SettingsItemComponent {
  @Input() lines: string = 'inset';

  @Input() setting: SettingItemConfig;

  @Output() settingTapped = new EventEmitter<SettingItemConfig>();

  constructor() {}

  settingTap(settingItem: SettingItemConfig) {
    this.settingTapped.next(settingItem);
  }
}
