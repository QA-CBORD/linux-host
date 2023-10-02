import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataMessage, DataMessageType } from '@sections/settings/models/setting-items-config.model';
import { SettingsMessagesComponent } from './settings-messages.component';

describe('SettingsMessagesComponent', () => {
  let component: SettingsMessagesComponent;
  let fixture: ComponentFixture<SettingsMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SettingsMessagesComponent]
    });SettingsMessagesComponent
    fixture = TestBed.createComponent(SettingsMessagesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('should return a telephone href', () => {
    const message = { type: DataMessageType.TELEPHONE, value: '1234567890' } as DataMessage;
    const href = component.getHref(message);
    expect(href).toEqual('tel:1234567890');
  });

  it('should return an email href', () => {
    const message = { type: DataMessageType.EMAIL, value: 'example@email.com' } as DataMessage;
    const href = component.getHref(message);
    expect(href).toEqual('mailto:example@email.com');
  });

  it('should return a URL', () => {
    const message = { type: DataMessageType.URL, value: 'https://example.com' } as DataMessage;
    const href = component.getHref(message);
    expect(href).toEqual('https://example.com');
  });

  it('should return an SMS href', () => {
    const message = { type: DataMessageType.SMS, value: '1234567890' } as DataMessage;
    const href = component.getHref(message);
    expect(href).toEqual('sms:1234567890');
  });

  it('should return _blank target for URL', () => {
    const message = { type: DataMessageType.URL, value: 'https://example.com' } as DataMessage;
    const target = component.getTarget(message);
    expect(target).toEqual('_blank');
  });

  it('should return an empty target for other types', () => {
    const message = { type: DataMessageType.TELEPHONE, value: '1234567890' } as DataMessage;
    const target = component.getTarget(message);
    expect(target).toEqual('');
  });
});
