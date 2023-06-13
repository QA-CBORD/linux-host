import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { TileWrapperComponent } from './tile-wrapper.component';

describe('TileWrapperComponent', () => {
  let component: TileWrapperComponent;
  let fixture: ComponentFixture<TileWrapperComponent>;

  beforeEach(() => {
    const routerStub = () => ({ url: {}, navigate: (array, object) => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TileWrapperComponent],
      providers: [{ provide: Router, useFactory: routerStub }]
    });
    fixture = TestBed.createComponent(TileWrapperComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
