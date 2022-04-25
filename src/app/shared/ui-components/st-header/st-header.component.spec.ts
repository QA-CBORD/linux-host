import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StHeaderComponent } from './st-header.component';

describe('StHeaderComponent', () => {
  let component: StHeaderComponent;
  let fixture: ComponentFixture<StHeaderComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StHeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should create the about page', () => {
    expect(component).toBeTruthy();
  });

  it('should match the snapshot', () => {
    expect(compiled).toMatchSnapshot();
  });

  it('should dismiss the modal', () => {
    const spy = jest.spyOn(component.onDismiss, 'emit');
    component.onDissmissClicked();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
