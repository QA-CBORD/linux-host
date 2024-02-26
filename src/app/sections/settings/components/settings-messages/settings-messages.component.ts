import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DataMessage, DataMessageType } from '@sections/settings/models/setting-items-config.model';

@Component({
  selector: 'st-settings-messages',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './settings-messages.component.html',
  styleUrls: ['./settings-messages.component.scss'],
})
export class SettingsMessagesComponent {
  @Input() messages: DataMessage[];
  @Input() count = 4;


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
