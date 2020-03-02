import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StButtonComponent } from './st-button.component';


describe('StCountdownPage', () => {
  let component: StButtonComponent;
  let fixture: ComponentFixture<StButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
