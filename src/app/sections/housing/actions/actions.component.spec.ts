import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ActionsComponent } from './actions.component';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(() => {
    const popoverControllerStub = () => ({
      create: object => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ActionsComponent],
      providers: [
        { provide: PopoverController, useFactory: popoverControllerStub }
      ]
    });
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`showEditOption has default value`, () => {
    expect(component.showEditOption).toEqual(true);
  });

  it(`showViewOption has default value`, () => {
    expect(component.showViewOption).toEqual(true);
  });

  it(`showRemoveOption has default value`, () => {
    expect(component.showRemoveOption).toEqual(false);
  });

  it(`showDetailsOption has default value`, () => {
    expect(component.showDetailsOption).toEqual(false);
  });
});
