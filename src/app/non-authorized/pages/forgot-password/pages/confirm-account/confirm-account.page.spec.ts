import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmAccountPage } from './confirm-account.page';

describe('ConfirmAccountPage', () => {
  let component: ConfirmAccountPage;
  let fixture: ComponentFixture<ConfirmAccountPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConfirmAccountPage]
    });
    fixture = TestBed.createComponent(ConfirmAccountPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
