import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContractsService } from '@sections/housing/contracts/contracts.service';
import { SignContractComponent } from './sign-contract.component';

describe('SignContractComponent', () => {
  let component: SignContractComponent;
  let fixture: ComponentFixture<SignContractComponent>;

  beforeEach(() => {
    const contractsServiceStub = () => ({ sign: checked => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SignContractComponent],
      providers: [
        { provide: ContractsService, useFactory: contractsServiceStub }
      ]
    });
    fixture = TestBed.createComponent(SignContractComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
