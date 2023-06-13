import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Inspections } from './inspections-forms.model';
import { InspectionsStateService } from './inspections-forms-state.service';
import { TermsService } from '../terms/terms.service';
import { InspectionsComponent } from './inspections-forms.component';

describe('InspectionsComponent', () => {
  let component: InspectionsComponent;
  let fixture: ComponentFixture<InspectionsComponent>;

  beforeEach(() => {
    const inspectionsStateServiceStub = () => ({});
    const termsServiceStub = () => ({ termId$: { subscribe: f => f({}) } });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InspectionsComponent],
      providers: [
        {
          provide: InspectionsStateService,
          useFactory: inspectionsStateServiceStub
        },
        { provide: TermsService, useFactory: termsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(InspectionsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
