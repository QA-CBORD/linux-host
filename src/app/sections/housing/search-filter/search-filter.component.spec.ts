import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(() => {
    const modalControllerStub = () => ({
      create: object => ({ then: () => ({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchFilterComponent],
      providers: [{ provide: ModalController, useFactory: modalControllerStub }]
    });
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('openFilterModal', () => {
    it('makes expected calls', () => {
      const modalControllerStub: ModalController = fixture.debugElement.injector.get(
        ModalController
      );
      spyOn(modalControllerStub, 'create').and.callThrough();
      component.openFilterModal();
      expect(modalControllerStub.create).toHaveBeenCalled();
    });
  });
});
