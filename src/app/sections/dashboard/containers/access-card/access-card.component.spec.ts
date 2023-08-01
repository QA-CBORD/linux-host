import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AccessCardComponent } from "./access-card.component";

describe("AccessCardComponent", () => {
  let component: AccessCardComponent;
  let fixture: ComponentFixture<AccessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  describe('Component', () => {
    it('should exist', () => {
      expect(component).toBeTruthy();
    });
  });
})