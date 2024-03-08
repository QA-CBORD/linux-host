
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InputAmountComponent } from './input-amount.component';
import { By } from '@angular/platform-browser';

describe('InputAmountComponent', () => {
  let component: InputAmountComponent;
  let fixture: ComponentFixture<InputAmountComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InputAmountComponent]
    });
    fixture = TestBed.createComponent(InputAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit onInput event', () => {
    const spy = jest.spyOn(component.onInput, 'emit');
    const event = new Event('input');
    component.ionInputEvent(event);
    expect(spy).toHaveBeenCalledWith(event);
  });

  it('should emit onKeyDown event', () => {
    const spy = jest.spyOn(component.onKeyDown, 'emit');
    const event = new Event('keydown');
    component.keydownEvent(event);
    expect(spy).toHaveBeenCalledWith(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit onBlur event', () => {
    const spy = jest.spyOn(component.onBlur, 'emit');
    const event = new Event('blur');
    component.onBlurEvent(event);
    expect(spy).toHaveBeenCalledWith(event);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should trigger ion-input event', () => {
    const ionInput = fixture.debugElement.query(By.css('ion-input')).nativeElement;
    const spy = jest.spyOn(component, 'ionInputEvent');
    ionInput.dispatchEvent(new Event('ionInput'));
    expect(spy).toHaveBeenCalled();
  });

  it('should trigger keydown event', () => {
    const ionInput = fixture.debugElement.query(By.css('ion-input')).nativeElement;
    const spy = jest.spyOn(component, 'keydownEvent');
    ionInput.dispatchEvent(new Event('keydown'));
    expect(spy).toHaveBeenCalled();
  });

  it('should trigger blur event', async () => {
    const ionInput = fixture.debugElement.query(By.css('ion-input')).nativeElement;
    const spy = jest.spyOn(component, 'onBlurEvent');
    ionInput.dispatchEvent(new Event('ionBlur'));
    expect(spy).toHaveBeenCalled();
  });
});

