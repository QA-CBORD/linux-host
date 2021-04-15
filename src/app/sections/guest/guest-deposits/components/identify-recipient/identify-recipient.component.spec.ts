import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifyRecipientComponent } from './identify-recipient.component';

describe('IdentifyRecipientComponent', () => {
  let component: IdentifyRecipientComponent;
  let fixture: ComponentFixture<IdentifyRecipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentifyRecipientComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifyRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
