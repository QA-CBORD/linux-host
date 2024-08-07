import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, Platform } from '@ionic/angular';
import { of } from 'rxjs';
import { AccountListComponent } from './account-list.component';
import { AccountService } from '@sections/accounts/services/accounts.service';
import { TransactionService } from '@sections/accounts/services/transaction.service';
import { CONTENT_STRINGS } from '@sections/accounts/accounts.config';
import { Router, RouterModule } from '@angular/router';
import { UserAccount } from '@core/model/account/account.model';

describe('AccountListComponent', () => {
  let component: AccountListComponent;
  let fixture: ComponentFixture<AccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountListComponent],
      imports: [IonicModule, RouterModule.forRoot(
        [{ path: 'patron/accounts/account-details/1', component: AccountListComponent }]
      )],
      providers: [
        {
          provide: Platform,
          useValue: {
            is: jest.fn(),
            width: jest.fn().mockReturnValue(700)
          }
        },
        {
          provide: AccountService,
          useValue: {
            getAccounts: jest.fn(() => of([])),
            getContentStrings: jest.fn().mockReturnValue({ [CONTENT_STRINGS.allAccountsLabel]: 'test' }),
          },
        },
        {
          provide: TransactionService,
          useValue: {
            getTransactions: jest.fn(() => of([])),
            getContentStrings: jest.fn().mockReturnValue({ [CONTENT_STRINGS.allAccountsLabel]: 'test' }),
          },
        }
        ,
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          },
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define resolutions on initialization', () => {
    jest.spyOn(component as any, 'defineResolution');
    component.ngOnInit();
    expect(component['defineResolution']).toBeCalled();
  });

  it('should show hidden accounts', () => {
    component.showHiddenAccounts();
    expect(component.accountsHidden).toEqual([]);
  });

  it('should emit the account info on account clicked', waitForAsync(() => {
    const emitSpy = jest.spyOn(component.onAccountInfoEmit, 'emit');
    component.tabletResolution = true;
    component.onAccountClicked('1', 'John Doe');
    expect(emitSpy).toHaveBeenCalled();
  }));

  it('should define the tablet resolution depending on width', waitForAsync(() => {
    component['defineResolution']();
    expect(component.tabletResolution).toBeFalsy();
  }));

  it('should set the content strings', () => {
    component['setContentStrings']();
    component.trackByAccountId(1, { id: '1' } as UserAccount);
    expect(component.contentString).toEqual({ 'label_all-accounts': 'test' });
  });

  it('should not set the account if it is less than amount to show', () => {
    component.accounts = [{ id: '1' } as UserAccount];
    expect(component.accountsShowed).toEqual([{ "id": "1" }]);
    expect(component.accountsHidden).not.toEqual([{ "id": "1" }]);
  });

  it('should set the hidden account if it is more than amount to show', () => {
    component.accounts = new Array(8).fill({ "id": "1" } as UserAccount);
    console.log(component.accountsHidden)
    expect(component.accountsHidden).toEqual([{ id: '1' }]);
  });
});