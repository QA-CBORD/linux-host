import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { StButtonComponent } from "./st-button.component";

describe("StButtonComponent", () => {
  let component: StButtonComponent;
  let fixture: ComponentFixture<StButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StButtonComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  describe('Main', () => {
    it('should exist', () => {
      expect(component).toBeTruthy();
    });
  });
})