import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ApplicationsListComponent } from './applications-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActionsComponent } from '@sections/housing/actions/actions.component';

describe('Application list test', () => {
  const applicationDetails = [
    {
      applicationDefinition: {
        key: 96,
        termKey: 151,
        applicationTitle: 'MXD2 23.1.29 Appl Pmt Roommate',
        accountCodeKey: 32,
        amount: 60,
        canEdit: true,
      },
      patronApplication: {
        applicationDefinitionKey: 96,
        status: 3,
        key: 383,
        patronKey: 11454,
        createdDateTime: '2023-03-22T18:18:44.162',
        submittedDateTime: '2023-03-22T18:21:41.795',
        modifiedDate: '2023-03-22T18:21:41.795',
        isApplicationSubmitted: true,
        isApplicationAccepted: false,
        isApplicationCanceled: false,
      },
      patronAddresses: [],
    },
    {
      applicationDefinition: {
        key: 96,
        termKey: 151,
        applicationTitle: 'MXD2 23.1.77 Appl Pmt Roommate',
        accountCodeKey: 32,
        amount: 60,
        canEdit: false,
      },
      patronApplication: {
        applicationDefinitionKey: 96,
        status: 3,
        key: 383,
        patronKey: 11454,
        createdDateTime: '2023-03-22T18:18:44.162',
        submittedDateTime: '2023-03-22T18:21:41.795',
        modifiedDate: '2023-03-22T18:21:41.795',
        isApplicationSubmitted: false,
        isApplicationAccepted: false,
        isApplicationCanceled: false,
      },
      patronAddresses: [],
    },
    {
      applicationDefinition: {
        key: 97,
        termKey: 151,
        applicationTitle: 'MXD 23Summ simple appl pmt',
        accountCodeKey: 100,
        amount: 30,
        canEdit: false,
      },
      patronApplication: {
        applicationDefinitionKey: 97,
        status: 3,
        key: 384,
        patronKey: 11454,
        createdDateTime: '2023-03-22T18:23:12.688',
        submittedDateTime: '2023-03-22T18:23:22.785',
        modifiedDate: '2023-03-22T18:23:22.785',
        isApplicationSubmitted: true,
        isApplicationAccepted: false,
        isApplicationCanceled: false,
      },
      patronAddresses: [],
    },
  ];
  let component: ApplicationsListComponent;
  let fixture: ComponentFixture<ApplicationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplicationsListComponent],
      imports: [CommonModule, IonicModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationsListComponent);
    component = fixture.componentInstance;
    component.applications = applicationDetails;
    fixture.detectChanges();
  });

  describe('Edit application', () => {
    it('should be editable if ResCenter enabled canEdit', () => {
      const actions = fixture.debugElement.queryAll(By.css('st-actions'));
      expect((<ActionsComponent>actions[0].nativeElement).canEdit).toBeTruthy();
    });

    it('should editable if application is not submitted', () => {
      const actions = fixture.debugElement.queryAll(By.css('st-actions'));
      expect((<ActionsComponent>actions[1].nativeElement).canEdit).toBeTruthy();
    });

    it('should NOT be editable if submitted and canEdit is not set in ResCenter', () => {
      const actions = fixture.debugElement.queryAll(By.css('st-actions'));
      expect((<ActionsComponent>actions[2].nativeElement).canEdit).toBeFalsy();
    });
  });
});
