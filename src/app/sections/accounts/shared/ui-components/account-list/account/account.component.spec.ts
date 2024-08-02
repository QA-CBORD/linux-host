import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { UserAccount } from '../../../../../../core/model/account/account.model';
import { TransactionUnitsPipeModule } from '@shared/pipes/transaction-units';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports: [TransactionUnitsPipeModule, HttpClientTestingModule],
      providers: [AccountService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the tabletResolution input', () => {
    const tabletResolution = true;
    component.tabletResolution = tabletResolution;
    expect(component.tabletResolution).toEqual(tabletResolution);
  });

  it('should set the account input', () => {
    const account: UserAccount = { id: 1, name: 'John Doe' } as any;
    component.account = account;
    expect(component.account).toEqual(account);
  });

  it('should set the lastItem input', () => {
    const lastItem = true;
    component.lastItem = lastItem;
    expect(component.lastItem).toEqual(lastItem);
  });
});