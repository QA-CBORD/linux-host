import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPassForm } from './user-pass-form.page';


describe('UserPassForm', () => {
  let component: UserPassForm;
  let fixture: ComponentFixture<UserPassForm>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPassForm ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPassForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
