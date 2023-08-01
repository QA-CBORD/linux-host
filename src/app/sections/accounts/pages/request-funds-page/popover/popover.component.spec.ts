import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { PopoverComponent } from './popover.component';
import { PopoverConfig } from '@core/model/popover/popover.model';
import { PopupTypes } from '@sections/rewards/rewards.config';
import { buttons } from '@core/utils/buttons.config';

@Component({ selector: 'st-icon', template: '' }) // Mocking st-icon component
class MockIconComponent {
  @Input() icon: string;
}

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopoverComponent, MockIconComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize config properly in ngOnInit', () => {
    component.ngOnInit();
    expect(component.config).toEqual({
      type: PopupTypes.CANCEL,
      title: null,
      buttons: [{ ...buttons.CLOSE, label: 'done' }],
      message: '',
      code: 'center',
    } as PopoverConfig<string>);
  });
});