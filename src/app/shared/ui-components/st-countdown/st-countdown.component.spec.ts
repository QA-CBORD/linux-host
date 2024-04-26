import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { StCountdownComponent } from './st-countdown.component';

describe('StCountdownComponent', () => {
  let component: StCountdownComponent;
  let fixture: ComponentFixture<StCountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [StCountdownComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onTimeout event when countdown ends', done => {
    component.seconds = 1;
    component.ngOnInit();

    component.onTimeout.subscribe(value => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should have correct animation duration', () => {
    component.seconds = 5;
    expect(component.animation).toEqual({ 'animation-duration': '5s' });
  });
});
