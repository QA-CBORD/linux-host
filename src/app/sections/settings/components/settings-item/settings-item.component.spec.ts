import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DataMessage, DataMessageType, SettingItemConfig } from '@sections/settings/models/setting-items-config.model';
import { SettingsItemComponent } from './settings-item.component';

describe('SettingsItemComponent', () => {
  let component: SettingsItemComponent;
  let fixture: ComponentFixture<SettingsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SettingsItemComponent]
    });
    fixture = TestBed.createComponent(SettingsItemComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`lines has default value`, () => {
    expect(component.lines).toEqual(`inset`);
  });
});
