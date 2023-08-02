import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StDateSelectComponent } from "./st-date-select.component";

describe("StDateSelectComponent", () => {
  let component: StDateSelectComponent;
  let fixture: ComponentFixture<StDateSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StDateSelectComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StDateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  describe('Main', () => {
    it('should exist', () => {
      expect(component).toBeTruthy();
    });
  });
})