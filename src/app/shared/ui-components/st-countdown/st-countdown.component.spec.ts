import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StCountdownComponent } from './st-countdown.component';


describe('StCountdownPage', () => {
  let component: StCountdownComponent;
  let fixture: ComponentFixture<StCountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StCountdownComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StCountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
