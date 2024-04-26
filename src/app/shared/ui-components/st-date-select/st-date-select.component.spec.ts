import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StDateSelectComponent } from './st-date-select.component';
import { IonicModule } from '@ionic/angular';

describe('StDateSelectComponent', () => {
  let component: StDateSelectComponent;
  let fixture: ComponentFixture<StDateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StDateSelectComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StDateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should handle change', () => {
    const value = '2022-01-01';
    const event = new CustomEvent('change', { detail: { value } });
    const writeValueSpy = jest.spyOn(component, 'writeValue');
    component.onChange = jest.fn();
  
    component.handleChange(event);
  
    expect(writeValueSpy).toHaveBeenCalledWith(value);
    expect(component.onChange).toHaveBeenCalledWith(value);
  });

  it('should register onChange', () => {
    const fn = () => {};
    component.registerOnChange(fn);
    expect(component.onChange).toBe(fn);
  });

  it('should register onTouched', () => {
    const fn = () => {};
    component.registerOnTouched(fn);
    expect(component.onTouched).toBe(fn);
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.isDisabled).toBe(true);
  });

  it('should write value', () => {
    const value = '2022-01-01';
    const spy = jest.spyOn(component as any, '_checkIsFilled');
    component.writeValue(value);
    expect(component.value).toBe(value);
    expect(spy).toHaveBeenCalledWith(value);
  });
});
