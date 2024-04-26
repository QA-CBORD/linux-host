import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StGlobalPopoverComponent } from './st-global-popover.component';
import { StPopoverComponentDataModel } from '@shared/model/st-popover-data.model';
import { buttons as BUTTONS, BUTTON_TYPE, buttons } from '@core/utils/buttons.config';
import { PopupButton } from '@core/model/button';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StPopoverLayoutModule } from '../st-popover-layout/st-popover-layout.module';

describe('StGlobalPopoverComponent', () => {
  let component: StGlobalPopoverComponent;
  let fixture: ComponentFixture<StGlobalPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule, StPopoverLayoutModule],
      declarations: [ StGlobalPopoverComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(StGlobalPopoverComponent);
    component = fixture.componentInstance;
  });

  it('should initialize popoverConfig on init', () => {
    const data: StPopoverComponentDataModel = {
      message: 'test message',
      title: 'test title',
      buttons: [{ type: BUTTON_TYPE.CLOSE }] as PopupButton[],
      showClose: true
    };
    component.data = data;

    component.ngOnInit();

    expect(component.popoverConfig).toBeTruthy();
  });

  it('should return input buttons if they exist and showCancelBtn is false', () => {
    const buttons = [{ label: 'test button' }];

    const result = component.resolveButtons(buttons, false);

    expect(result).toEqual(buttons);
  });

  it('should return input buttons and cancel button if they exist and showCancelBtn is true', () => {
    const buttons = [{ label: 'test button' }];
    const expected = [{ ...BUTTONS.CLOSE, label: 'CLOSE' }, ...buttons];

    const result = component.resolveButtons(buttons, true);

    expect(result).toEqual(expected);
  });

  it('should return only cancel button if input buttons do not exist', () => {
    const expected = [{ ...BUTTONS.CLOSE, label: 'CLOSE' }];

    const result = component.resolveButtons();

    expect(result).toEqual(expected);
  });
});