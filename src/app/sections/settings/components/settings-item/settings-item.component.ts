import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DataMessage, DataMessageType, SettingItemConfig } from '@sections/settings/models/setting-items-config.model';
import { Observable, of } from 'rxjs';
import { SettingsMessagesComponent } from '../settings-messages/settings-messages.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'st-settings-item',
  standalone: true,
  imports: [CommonModule, IonicModule, SettingsMessagesComponent, TranslateModule],
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

  getHref(message: DataMessage) {
    return {
      [DataMessageType.TELEPHONE]: `tel:${message.value}`,
      [DataMessageType.EMAIL]: `mailto:${message.value}`,
      [DataMessageType.URL]: message.value,
      [DataMessageType.SMS]: `sms:${message.value}`
    }[message.type]
  }

  getTarget(message: DataMessage) {
    return {
      [DataMessageType.URL]: '_blank'
    }[message.type] || '';
  }
}
