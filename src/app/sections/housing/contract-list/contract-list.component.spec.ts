import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ContractListStateService } from './contract-list-state.service';
import { ContractListComponent } from './contract-list.component';

describe('ContractListComponent', () => {
  let component: ContractListComponent;
  let fixture: ComponentFixture<ContractListComponent>;

  beforeEach(() => {
    const contractListStateServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ContractListComponent],
      providers: [
        {
          provide: ContractListStateService,
          useFactory: contractListStateServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(ContractListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
