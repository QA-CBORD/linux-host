import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractListComponent } from './contract-list.component';

describe('ContractListComponent', () => {
  let component: ContractListComponent;
  let fixture: ComponentFixture<ContractListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContractListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [CommonModule],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Contracts Tab', () => {
    it('Contract List Component should exist', () => {
      expect(component).toBeTruthy();
    });
  });
});
