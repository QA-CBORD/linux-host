import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoPronounsComponent } from './personal-info-pronouns.component';

describe('PersonalInfoPronounsComponent', () => {
  let component: PersonalInfoPronounsComponent;
  let fixture: ComponentFixture<PersonalInfoPronounsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PersonalInfoPronounsComponent]
    });
    fixture = TestBed.createComponent(PersonalInfoPronounsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
