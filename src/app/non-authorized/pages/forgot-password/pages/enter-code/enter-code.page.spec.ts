import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EnterCodePage } from './enter-code.page';

describe('EnterCodePage', () => {
  let component: EnterCodePage;
  let fixture: ComponentFixture<EnterCodePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EnterCodePage]
    });
    fixture = TestBed.createComponent(EnterCodePage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
