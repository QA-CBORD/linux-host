import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SettingItemConfig } from '@sections/settings/models/setting-items-config.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'st-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.scss'],
})
export class SettingsItemComponent implements OnInit {
  @Input() lines = 'inset';

  @Input() setting: SettingItemConfig;

  @Output() settingTapped = new EventEmitter<SettingItemConfig>();

  settingLabel$: Observable<string>;

  settingTap(settingItem: SettingItemConfig) {
    this.settingTapped.next(settingItem);
  }

  ngOnInit(): void {
    if (typeof this.setting.label === 'string') {
      this.settingLabel$ = of(this.setting.label as string);
    } else {
      this.settingLabel$ = this.setting.label as Observable<string>;
    }
  }
}
