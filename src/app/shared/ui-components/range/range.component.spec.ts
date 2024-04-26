import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ANY_PRICE, RangeComponent } from './range.component';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RangeComponent', () => {
  let component: RangeComponent;
  let fixture: ComponentFixture<RangeComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RangeComponent],
      imports: [IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.parentGroup = formBuilder.group({});
    component.min = 0;
    component.max = 100;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate price correctly when upper value is less than max', () => {
    const value = { lower: 0, upper: 50 };
    expect(component['calculatePrice'](value)).toEqual('$50 or less');
  });

  it('should return "Any Price" when upper value equals max', () => {
    const value = { lower: 0, upper: 100 };
    expect(component['calculatePrice'](value)).toEqual(ANY_PRICE);
  });

  it('should handle range change correctly', () => {
    const newValue = { lower: 0, upper: 50 };
    component.handleRangeChange(newValue);
    expect(component.price).toEqual('$50 or less');
  });

  it('should handle range change correctly when upper value equals max', () => {
    const newValue = { lower: 0, upper: 100 };
    component.handleRangeChange(newValue);
    expect(component.price).toEqual('Any Price');
  });
});
