import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UnitsPage } from './units.page';

describe('UnitsPage', () => {
  let component: UnitsPage;
  let fixture: ComponentFixture<UnitsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UnitsPage]
    });
    fixture = TestBed.createComponent(UnitsPage);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`units has default value`, () => {
    expect(component.units).toEqual([]);
  });
});
