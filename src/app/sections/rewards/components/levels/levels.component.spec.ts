import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelsComponent } from './levels.component';

describe('LevelsPage', () => {
  let component: LevelsComponent;
  let fixture: ComponentFixture<LevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LevelsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
