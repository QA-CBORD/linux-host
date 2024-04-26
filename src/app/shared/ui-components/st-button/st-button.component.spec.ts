import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StButtonComponent } from './st-button.component';
import { IonicModule } from '@ionic/angular';

describe('StButtonComponent', () => {
  let component: StButtonComponent;
  let fixture: ComponentFixture<StButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [IonicModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event when button is clicked and not disabled', () => {
    const event = new Event('click');
    component.disabled = false;
    jest.spyOn(component.onClick, 'emit');

    component.onClickButton(event);

    expect(component.onClick.emit).toHaveBeenCalledWith(event);
  });

  it('should not emit onClick event when button is clicked and disabled', () => {
    const event = new Event('click');
    component.disabled = true;
    jest.spyOn(component.onClick, 'emit');

    component.onClickButton(event);

    expect(component.onClick.emit).not.toHaveBeenCalled();
  });
});
