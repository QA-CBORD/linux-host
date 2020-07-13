import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureMessagePage } from './secure-message.page';

describe('SecureMessagePage', () => {
  let component: SecureMessagePage;
  let fixture: ComponentFixture<SecureMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecureMessagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
