import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TermsService } from './terms.service';
import { LoadingService } from '@core/service/loading/loading.service';
import { Term } from './terms.model';
import { TermsComponent } from './terms.component';

describe('TermsComponent', () => {
  let component: TermsComponent;
  let fixture: ComponentFixture<TermsComponent>;

  beforeEach(() => {
    const termsServiceStub = () => ({
      getTerms: () => ({ pipe: () => ({}) }),
      termlabel$: {},
      setTerm: term => ({})
    });
    const loadingServiceStub = () => ({
      showSpinner: () => ({}),
      closeSpinner: () => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TermsComponent],
      providers: [
        { provide: TermsService, useFactory: termsServiceStub },
        { provide: LoadingService, useFactory: loadingServiceStub }
      ]
    });
    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`disabled has default value`, () => {
    expect(component.disabled).toEqual(false);
  });

  describe('handleSelectTerm', () => {
    it('makes expected calls', () => {
      const termsServiceStub: TermsService = fixture.debugElement.injector.get(
        TermsService
      );
      const termStub: Term = <any>{};
     jest.spyOn(termsServiceStub, 'setTerm');
      component.handleSelectTerm(termStub);
      expect(termsServiceStub.setTerm).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const termsServiceStub: TermsService = fixture.debugElement.injector.get(
        TermsService
      );
      const loadingServiceStub: LoadingService = fixture.debugElement.injector.get(
        LoadingService
      );
     jest.spyOn(termsServiceStub, 'getTerms');
     jest.spyOn(loadingServiceStub, 'showSpinner');
     jest.spyOn(loadingServiceStub, 'closeSpinner');
      component.ngOnInit();
      expect(termsServiceStub.getTerms).toHaveBeenCalled();
      expect(loadingServiceStub.showSpinner).toHaveBeenCalled();
    });
  });
});
