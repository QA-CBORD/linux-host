import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EmptyPlaceholderComponent } from './empty-placeholder.component';

describe('EmptyPlaceholderComponent', () => {
  let component: EmptyPlaceholderComponent;
  let fixture: ComponentFixture<EmptyPlaceholderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EmptyPlaceholderComponent]
    });
    fixture = TestBed.createComponent(EmptyPlaceholderComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
