import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserTrackLevelInfo } from '../../../models';
import { ExpandListComponent } from './expand-list.component';

describe('ExpandListComponent', () => {
  let component: ExpandListComponent;
  let fixture: ComponentFixture<ExpandListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExpandListComponent]
    });
    fixture = TestBed.createComponent(ExpandListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
