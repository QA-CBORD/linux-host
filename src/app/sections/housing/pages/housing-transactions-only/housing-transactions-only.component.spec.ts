import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingTransactionsOnlyComponent } from './housing-transactions-only.component';
import { TransactionService } from '@sections/accounts/services/transaction.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { AngularDelegate, ModalController, PopoverController } from '@ionic/angular';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HousingTransactionsOnlyComponent', () => {
  let component: HousingTransactionsOnlyComponent;
  let fixture: ComponentFixture<HousingTransactionsOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HousingTransactionsOnlyComponent ],
      imports: [HttpClientTestingModule],
      providers: [TransactionService, AccountService, HttpTestingController, ModalController, AngularDelegate, PopoverController],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousingTransactionsOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
