import { I18nPluralPipe, NgLocalization } from '@angular/common';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingService } from '@core/service/loading/loading.service';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';

import { ToastService } from '@core/service/toast/toast.service';
import { InspectionService } from '../../inspections-forms/inspections-forms.service';
import { HousingService } from '@sections/housing/housing.service';
import { InspectionsDetailsPage } from './inspections-details.page';

describe('InspectionsDetailsPage', () => {
  let component: InspectionsDetailsPage;
  let fixture: ComponentFixture<InspectionsDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InspectionsDetailsPage],
      imports: [CommonModule, RouterModule, RouterTestingModule, ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                checkIn: true
              }
            }
          }
        },
        {
          provide: Platform,
          useValue: {
            pause: of([])
          }
        },
        {
          provide: AlertController,
          useValue: {
            create: jest.fn()
          }
        },
        {
          provide: LoadingService,
          useValue: {
            showSpinner: jest.fn(),
            closeSpinner: jest.fn()
          }
        },
        {
          provide: HousingService,
          useValue: {
            getInspectionDetails: () => of([]),
            goToDashboard: jest.fn()
          }
        },
        {
          provide: ToastService,
          useValue: {
            showToast: jest.fn()
          }
        },
        {
          provide: InspectionService,
          useValue: {
            getFormDefinitionInspection: () => of([])
          }
        },
        {
          provide: NativeProvider,
          useValue: {
            isMobile: jest.fn()
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInIt', () => {
    it('should set component params value', () => {
      const _initInspectionDetailsObservable = jest.spyOn(component as any, "_initInspectionDetailsObservable");
      const createInspectionForm = jest.spyOn(component, "createInspectionForm")

      component.ngOnInit();

      expect(component.residentInspectionKey).toBe(parseInt(component['_route'].snapshot.params.residentInspectionKey));
      expect(component.contractElementKey).toBe(parseInt(component['_route'].snapshot.params.contractElementKey));
      expect(component.checkIn).toBeTruthy();
      expect(component.termKey).toBe(parseInt(component['_route'].snapshot.params.termKey));
      expect(component.status).toBe(parseInt(component['_route'].snapshot.params.status));
      expect(_initInspectionDetailsObservable).toHaveBeenCalled();
      expect(createInspectionForm).toHaveBeenCalled();
    });

    it('should call dismiss alert', () => {
      component['nativeProvider'].isMobile = () => true ;
      const activeAlerts = [{ dismiss: jest.fn() }];
      component['activeAlerts'] = activeAlerts as any;
      component['_platform'].pause = of([]) as any;

      component.ngOnInit();

      expect(activeAlerts[0].dismiss).toHaveBeenCalled();
    });
  });

  describe('getInspectionConditions', () => {
    it('should get inspection condition values', () => {
      const values = { values: [{ selected: true }] };
      jest.spyOn(component['_inspectionService'], "getFormDefinitionInspection").mockReturnValue(of(values) as any);
      component['getInspectionConditions']();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe all subscription', () => {
      const unsubscribe = jest.spyOn(component['subscriptions'], 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribe).toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    it('should call _touch method', () => {
      const _touch = jest.spyOn(component as any, '_touch');
      component.submit();
      expect(_touch).toHaveBeenCalled();
    });
  });

  describe('_touch', () => {
    it('should call _touch method', () => {
      const questions = { questions: [{ touch: jest.fn() }] };
      component.questions = questions.questions as any;
      component['_touch']();
      expect(questions.questions[0].touch).toHaveBeenCalled();
    });
  });

  describe('countItemsLeft', () => {
    it('should return count items left', () => {
      const inspectionData = { sections: [{ items: [{ residentConditionKey: 0 }] }] };
      const result = component.countItemsLeft(inspectionData as any);
      expect(result).toBe(1);
    });
  });

  describe('getConditionStaff', () => {
    it('should set condition staff', () => {
      const conditions = [{ value: "100", label: "test" }];
      component.conditions = conditions;
      const result = component.getConditionStaff(100);
      expect(result).toBe("test");
    });
  });

  describe('changeView', () => {
    it('should set section', () => {
      const name = "section1";
      component.changeView(name);
      expect(component.section).toBe(name);
    });
  });

  describe('sectionsFormArray', () => {
    it('should return section from inspectionForm', () => {
      component.createInspectionForm();
      const result = component['sectionsFormArray'];
      expect(result).toBeDefined();
    });
  });

  describe('createInspectionForm', () => {
    it('should create inspectionForm', () => {
      component.createInspectionForm();
      expect(component.inspectionForm).toBeDefined();
    });
  });

  describe('getItemsArray', () => {
    it('should return items form array', () => {
      const bs = new FormControl();
      const result = component.getItemsArray(bs);
      expect(result).toBe(bs.get('items'));
    });
  });

  describe('createInspectionSubscription', () => {
    it('should return items form array', fakeAsync(() => {
      const inspectionData: any = {};
      const alert: any = { dismiss: () => Promise.resolve(true) }
      const status = { test: "" };
      const goToDashboard = jest.spyOn(component['_housingService'], 'goToDashboard');
      component['_inspectionService'] = { submitInspection: () => of(status) } as any;
      component['createInspectionSubscription'](inspectionData, alert);
      tick();
      expect(goToDashboard).toHaveBeenCalled();
    }));
  });
});


class CustomLocalization extends NgLocalization {
  getPluralCategory(count: number): string {
    return count === 1 ? 'one' : 'other';
  }
}

describe('Plural Pipe', () => {
  const i18nPlural = new I18nPluralPipe(new CustomLocalization());

  const roomsMapping = {
    '=0': 'No rooms left.',
    '=1': '# room left.',
    'other': '# rooms left.'
  };

  it('should return "No rooms left." when count is 0', () => {
    const count = 0;
    const result = i18nPlural.transform(count, roomsMapping);
    expect(result).toBe('No rooms left.');
  });

  it('should return "1 room left." when count is 1', () => {
    const count = 1;
    const result = i18nPlural.transform(count, roomsMapping);
    expect(result).toBe('1 room left.');
  });

  it('should return "{count} rooms left." when count is greater than 1', () => {
    const count = 5;
    const result = i18nPlural.transform(count, roomsMapping);
    expect(result).toBe('5 rooms left.');
  });

});
