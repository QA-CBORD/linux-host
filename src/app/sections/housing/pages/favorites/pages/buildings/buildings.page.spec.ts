import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BuildingsPage } from './buildings.page';

describe('BuildingsPage', () => {
  let component: BuildingsPage;
  let fixture: ComponentFixture<BuildingsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BuildingsPage]
    });
    fixture = TestBed.createComponent(BuildingsPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`buildings has default value`, () => {
    expect(component.buildings).toEqual([]);
  });
});
