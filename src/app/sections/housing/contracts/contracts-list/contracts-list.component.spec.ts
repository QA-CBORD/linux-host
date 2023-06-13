import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContractListDetails } from '../contracts.model';
import { ContractStatus } from '../contracts.model';
import { ContractsListComponent } from './contracts-list.component';

describe('ContractsListComponent', () => {
  let component: ContractsListComponent;
  let fixture: ComponentFixture<ContractsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ContractsListComponent]
    });
    fixture = TestBed.createComponent(ContractsListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('getStatus', () => {
    it('makes expected calls', () => {
      const contractListDetailsStub: ContractListDetails = <any>{};
      spyOn(component, '__getFormStatus').and.callThrough();
      component.getStatus(contractListDetailsStub);
      expect(component.__getFormStatus).toHaveBeenCalled();
    });
  });
});
