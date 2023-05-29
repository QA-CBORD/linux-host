import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ApplicationsComponent } from "./applications.component";
import { ApplicationsStateService } from './applications-state.service';
import { of } from 'rxjs';

describe("ApplicationsComponent", () => {
  let component: ApplicationsComponent;
  let fixture: ComponentFixture<ApplicationsComponent>;
  let applicationsStateService:ApplicationsStateService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    applicationsStateService = TestBed.inject(ApplicationsStateService);
  });

  describe('Application Page', () => {
    it('should exist', () => {
      expect(component).toBeTruthy();
    });
  });
})