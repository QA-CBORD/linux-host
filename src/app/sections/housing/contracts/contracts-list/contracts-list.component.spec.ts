import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContractFormStatus, ContractListDetails } from '../contracts.model';
import { ContractsListComponent } from './contracts-list.component';

describe('ContractsListComponent', () => {
  let component: ContractsListComponent;
  let fixture: ComponentFixture<ContractsListComponent>;
  const contractListDetailsStub: ContractListDetails = <any>{};

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ContractsListComponent],
    });
    fixture = TestBed.createComponent(ContractsListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('getStatus', () => {
    it('makes expected calls', () => {
      jest.spyOn(component, 'getFormStatus');
      component.getStatus(contractListDetailsStub);
      expect(component.getFormStatus).toHaveBeenCalled();
    });

    it('should return new status', () => {
      contractListDetailsStub.state = '1';
      expect(component.getStatus(contractListDetailsStub)).toEqual(ContractFormStatus[ContractFormStatus.New]);
    });

    it('should return new status', () => {
      contractListDetailsStub.state = ContractFormStatus.New.toString();
      expect(component.getStatus(contractListDetailsStub)).toEqual(ContractFormStatus[ContractFormStatus.New]);
    });

    it('should return submitted status ', () => {
      contractListDetailsStub.state = ContractFormStatus.Submitted.toString();
      expect(component.getStatus(contractListDetailsStub)).toEqual(ContractFormStatus[ContractFormStatus.Submitted]);
    });

    it('should return suspended status', () => {
      contractListDetailsStub.state = ContractFormStatus.Suspended.toString();
      expect(component.getStatus(contractListDetailsStub)).toEqual(ContractFormStatus[ContractFormStatus.Suspended]);
    });

    it('should return canceled status', () => {
      contractListDetailsStub.state = ContractFormStatus.Canceled.toString();
      expect(component.getStatus(contractListDetailsStub)).toEqual(ContractFormStatus[ContractFormStatus.Canceled]);
    });

    it('should return expired status', () => {
      contractListDetailsStub.state = ContractFormStatus.Expired.toString();
      expect(component.getStatus(contractListDetailsStub)).toEqual(ContractFormStatus[ContractFormStatus.Expired]);
    });
  });

  describe('allowEdit', () => {
    it('should allow edit on active state', () => {
      contractListDetailsStub.state = '1';
      expect(component.allowEdit(contractListDetailsStub)).toBeTruthy();
    });

    it('should allow editing on preliminary state', () => {
      contractListDetailsStub.state = '2';
      expect(component.allowEdit(contractListDetailsStub)).toBeTruthy();
    });
  });

  describe('getPath', () => {
    it('should allow edit', () => {
      expect(component.getPath(2, 150)).toContain('/housing/contracts/2/150');
    });

    it('should map trackId', () => {
      expect(component.trackById(0, <any>{ id: 150 })).toBe(150);
    });
  });
});
