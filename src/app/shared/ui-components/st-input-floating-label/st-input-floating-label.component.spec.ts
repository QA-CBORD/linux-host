import { fakeAsync, tick } from '@angular/core/testing';
import { StInputFloatingLabelComponent } from './st-input-floating-label.component';
import { FormControl } from '@angular/forms';

describe('StInputFloatingLabelComponent', () => {
  let component: StInputFloatingLabelComponent;

  beforeEach(() => {
    component = new StInputFloatingLabelComponent();
    component.inputRef = {
      nativeElement: document.createElement('input')
    };
    jest.spyOn(component.inputRef.nativeElement, 'focus');
    component.control = new FormControl();
    component['onChange'] = jest.fn();
    component['onTouched'] = jest.fn();
  });

  it('should mark control as dirty and set value on ngOnChanges', () => {
    component.control.setValue('test');
    component.ngOnChanges();
    expect(component.control.dirty).toBe(true);
    expect(component.value).toBe('test');
  });

  it('should toggle input type on toggleText', () => {
    component.toggleText();
    expect(component.inputRef.nativeElement.type).toBe('text');
    expect(component.showOrHide).toBe('Hide');

    component.toggleText();
    expect(component.inputRef.nativeElement.type).toBe('password');
    expect(component.showOrHide).toBe('Show');
  });

  it('should write value', () => {
    component.writeValue('test');
    expect(component.inputRef.nativeElement.value).toBe('test');
    expect(component.value).toBe('test');
  });

  it('should register onChange', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);
    expect(component['onChange']).toBe(fn);
  });

  it('should register onTouched', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);
    expect(component['onTouched']).toBe(fn);
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    expect(component.isDisabled).toBe(true);
  });

  it('should call onTouched on blur', () => {
    component.onBlur();
    expect(component['onTouched']).toHaveBeenCalled();
  });

  it('should change value on change handler', () => {
    component.onChangeHandler('test');
    expect(component.value).toBe('test');
    expect(component['onChange']).toHaveBeenCalledWith('test');
  });

  it('should focus', () => {
    component.focus();
    expect(component.inputRef.nativeElement.focus).toHaveBeenCalled();
  });

  it('should set passwordFieldDirty to true if control value changes and type is password', fakeAsync(() => {
    component.type = 'password';
    component.ngAfterViewInit();
    component.control.setValue('test');
    tick();
    expect(component.passwordFieldDirty).toBe(true);
  }));
  
  it('should not set passwordFieldDirty if type is not password', () => {
    component.type = 'text';
    component.control.setValue('test');
    component.ngAfterViewInit();
    expect(component.passwordFieldDirty).toBeUndefined();
  });
  
});