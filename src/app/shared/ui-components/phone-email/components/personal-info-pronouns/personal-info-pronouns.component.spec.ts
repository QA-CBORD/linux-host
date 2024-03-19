import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoPronounsComponent } from './personal-info-pronouns.component';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { TranslateService } from '@ngx-translate/core';

describe('PersonalInfoPronounsComponent', () => {
  let component: PersonalInfoPronounsComponent;
  let fixture: ComponentFixture<PersonalInfoPronounsComponent>;
  let _sessionService = {
    getIsWeb: jest.fn(() => true),
  };
  let translateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PersonalInfoPronounsComponent],
      providers: [
        { provide: SessionFacadeService, useValue: _sessionService },
        { provide: TranslateService, useValue: translateService },
      ],
    });
    fixture = TestBed.createComponent(PersonalInfoPronounsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
