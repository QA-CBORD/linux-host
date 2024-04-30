import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { PinLocationComponent } from './pin-location.component';

describe('PinLocationComponent', () => {
  let component: PinLocationComponent;
  let fixture: ComponentFixture<PinLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [ PinLocationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PinLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit pinned event when pinLocation is called', () => {
    const spy = jest.spyOn(component.pinned, 'emit');
    component.pinLocation();
    expect(spy).toHaveBeenCalled();
  });
});