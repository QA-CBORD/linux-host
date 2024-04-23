import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { StTextareaFloatingLabelComponent, CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR } from './st-textarea-floating-label.component';
import { IonicModule } from '@ionic/angular';

describe('StTextareaFloatingLabelComponent', () => {
  let component: StTextareaFloatingLabelComponent;
  let fixture: ComponentFixture<StTextareaFloatingLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [StTextareaFloatingLabelComponent],
      providers: [CUSTOM_TEXTAREA_CONTROL_VALUE_ACCESSOR]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StTextareaFloatingLabelComponent);
    component = fixture.componentInstance;
    component.control = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark control as touched after view init if control has value', () => {
    component.control.setValue('test');
    component.ngAfterViewInit();
    expect(component.control.touched).toBeTruthy();
  });

  it('should get and set value correctly', () => {
    component.value = 'test';
    expect(component.value).toEqual('test');
  });

  it('should write value correctly', () => {
    component.writeValue('test');
    expect(component.innerValue).toEqual('test');
  });

  it('should register onChange function correctly', () => {
    const fn = () => {};
    component.registerOnChange(fn);
    expect(component.onChange).toBe(fn);
  });

  it('should register onTouched function correctly', () => {
    const fn = () => {};
    component.registerOnTouched(fn);
    expect(component.onTouched).toBe(fn);
  });

  it('should set disabled state correctly', () => {
    component.setDisabledState(true);
    expect(component.isDisabled).toBeTruthy();
  });

  it('should handle change correctly', () => {
    const spy = jest.spyOn(component, 'writeValue');
    const spy2 = jest.spyOn(component, 'onChange');
    component.onChangeHandler({ detail: { value: 'test' } } as CustomEvent);
    expect(spy).toHaveBeenCalledWith('test');
    expect(spy2).toHaveBeenCalledWith('test');
  });

  it('should handle blur correctly', () => {
    const spy = jest.spyOn(component.onBlur, 'emit');
    const spy2 = jest.spyOn(component, 'onTouched');
    const event = new Event('blur');
    component.ionBlur(event);
    expect(spy2).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(event);
  });

  it('should handle focus correctly', () => {
    const spy = jest.spyOn(component.onFocus, 'emit');
    const event = new Event('focus');
    component.ionFocus(event);
    expect(spy).toHaveBeenCalledWith(event);
  });

  it('should return correct required state', () => {
    component.control.setValidators([Validators.required]);
    expect(component.isRequired).toBeTruthy();
  });
});