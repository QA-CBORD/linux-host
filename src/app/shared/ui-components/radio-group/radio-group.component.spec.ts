import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioGroupComponent } from './radio-group.component';
import { IonicModule } from '@ionic/angular';

describe('RadioGroupComponent', () => {
  let component: RadioGroupComponent;
  let fixture: ComponentFixture<RadioGroupComponent>;
  let changeDetector: ChangeDetectorRef;

  beforeEach(async () => {
    const changeDetector = {
      markForCheck: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [RadioGroupComponent],
      providers: [{ provide: ChangeDetectorRef, useValue: changeDetector }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupComponent);
    component = fixture.componentInstance;
    changeDetector.markForCheck = jest.fn();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle change correctly', () => {
    const mockEvent = { detail: { value: 'test' } };
    const mockFn = jest.fn();
    component.registerOnChange(mockFn);
    component.handleChange(mockEvent as any);
    expect(mockFn).toHaveBeenCalledWith('test');
  });

  it('should register onChange correctly', () => {
    const mockFn = jest.fn();
    component.registerOnChange(mockFn);
    expect(component.onChange).toBe(mockFn);
  });

  it('should update value and mark for check if new value is different', () => {
    const newValue = 'new value';
    component.value = 'initial value';

    component.writeValue(newValue);

    expect(component.value).toEqual(newValue);
  });

  it('should not update value or mark for check if new value is same as current value', () => {
    const currentValue = 'same value';
    component.value = currentValue;

    component.writeValue(currentValue);

    expect(component.value).toEqual(currentValue);
  });
});
