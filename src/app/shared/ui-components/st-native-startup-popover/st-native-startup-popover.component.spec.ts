import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StNativeStartupPopoverComponent } from '@shared/ui-components';


describe('StNativeStartupPopoverComponent', () => {
  let component: StNativeStartupPopoverComponent;
  let fixture: ComponentFixture<StNativeStartupPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StNativeStartupPopoverComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StNativeStartupPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
