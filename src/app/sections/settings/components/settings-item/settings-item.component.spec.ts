import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SettingsItemComponent } from './settings-item.component';

describe('SettingsItemComponent', () => {
  let component: SettingsItemComponent;
  let fixture: ComponentFixture<SettingsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [SettingsItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
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
