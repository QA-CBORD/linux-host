import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  StSelectFloatingLabelComponent,
  CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR,
} from './st-select-floating-label.component';
import { AccessibilityService } from '@shared/accessibility/services/accessibility.service';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';

describe('StSelectFloatingLabelComponent', () => {
  let component: StSelectFloatingLabelComponent;
  let fixture: ComponentFixture<StSelectFloatingLabelComponent>;
  let accesibilityService;

  beforeEach(async () => {
    accesibilityService = {
      focusElement: jest.fn(),
      isVoiceOverClick$: jest.fn(() => Promise.resolve(true)),
    };

    await TestBed.configureTestingModule({
      declarations: [StSelectFloatingLabelComponent],
      imports: [IonicModule],
      providers: [
        CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR,
        { provide: AccessibilityService, useValue: accesibilityService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StSelectFloatingLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set labelPlacement to stacked if placeholder is provided', () => {
    const placeholder = 'Select an option';
    component.placeholder = placeholder;
    component.ngOnInit();
    expect(component.labelPlacement).toBe('stacked');
  });

  it('should accept input for value', () => {
    const testValue = 'Test Value';
    component.value = testValue;
    expect(component.value).toBe(testValue);
  });

  it('should emit change event when value changes', () => {
    const testValue = 'Test Value';
    const spy = jest.spyOn(component.change, 'emit');
    component.registerOnChange(jest.fn()); // Add this line
    component.onChangeHandler({ detail: { value: testValue } } as any);
    expect(spy).toHaveBeenCalledWith(testValue);
  });

  it('should emit focus event when onFocus is called', () => {
    const spy = jest.spyOn(component.focus, 'emit');
    component.onFocus();
    expect(spy).toHaveBeenCalled();
  });

  it('should set isDisabled state', () => {
    component.setDisabledState(true);
    expect(component.isDisabled).toBe(true);
  });

  it('should call onTouched when onBlur is called', () => {
    const spy = jest.fn();
    component.registerOnTouched(spy);
    component.onBlur();
    expect(spy).toHaveBeenCalled();
  });

  it('should call selectRef.open when onDoubleTap is called and isVoiceOverClick$ resolves to true', async () => {
    const mockOpen = jest.fn();
    component.selectRef = { open: mockOpen } as any;
    jest.spyOn(accesibilityService, 'isVoiceOverClick$').mockResolvedValue(true);
    
    await component.onDoubleTap();
    
    expect(mockOpen).toHaveBeenCalled();
  });
});
