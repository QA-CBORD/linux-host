import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionItemComponent } from './transaction-item.component';
import { TransactionHistory } from '@core/model/transactions/transaction-history.model';
import { TransactionActionPipeModule } from '@shared/pipes/transaction-operation';
import { TransactionUnitsPipeModule } from '@shared/pipes/transaction-units';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TransactionItemComponent', () => {
    let component: TransactionItemComponent;
    let fixture: ComponentFixture<TransactionItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TransactionItemComponent],
            imports: [TransactionActionPipeModule, TransactionUnitsPipeModule, HttpClientTestingModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TransactionItemComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have transaction input', () => {
        const transaction: TransactionHistory = {
            transactionId: "1",
            amount: 100,
            postedDate: new Date(),
        } as any;
        component.transaction = transaction;
        fixture.detectChanges();
        expect(component.transaction).toEqual(transaction);
    });

    it('should render transaction details', () => {
        const transaction: TransactionHistory = {
            transactionId: "2",
            amount: 200,
            postedDate: new Date(),
        } as any;
        component.transaction = transaction;
        fixture.detectChanges();
        const element = fixture.nativeElement;
        expect(element.textContent).toContain(transaction.amount);
    });
});