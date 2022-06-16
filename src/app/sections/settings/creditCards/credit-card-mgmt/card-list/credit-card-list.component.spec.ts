import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ConfirmModule } from '@shared/confirm-modal/confirm-modal.module';
import { StButtonModule } from '@shared/ui-components/st-button';
import { StHeaderModule } from '@shared/ui-components/st-header/st-header.module';
import { CardListComponent } from './credit-card-list.component';

describe('CardListComponent', () => {
  let fixture: ComponentFixture<CardListComponent>;
  let component: CardListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, IonicModule, StHeaderModule, ConfirmModule, StButtonModule],
      declarations: [CardListComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    component.addItem = true;
    component.removeIcon = true;
    component.userAccounts = [
      {
        account: {
          accountDisplayName: 'Bonus Bucks',
          accountTender: '802',
          accountType: 3,
          balance: 3326.14,
          billingAddressId: null,
          depositAccepted: true,
          expirationMonth: null,
          expirationYear: null,
          id: 'T:1:efa5035a-0c8f-4e31-b7e4-d7f0484fb792:802',
          institutionId: '7612d8de-51e1-4cab-971d-88a317326437',
          isActive: true,
          lastFour: null,
          nameOnMedia: null,
          paymentSystemId: '3d91bb69-c4fe-4df9-8591-543e87888c92',
          paymentSystemType: 1,
          userId: 'efa5035a-0c8f-4e31-b7e4-d7f0484fb792',
        },
        display: '',
        iconSrc: '',
      },
    ];

    fixture.detectChanges();
  });

  it('Should create the CardListComponent', async () => {
    expect(component).toBeTruthy();
  });

  it('Should emit an onAdd event', async () => {
    jest.spyOn(component.onAdd, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.add-icon');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.onClick.emit).toBeTruthy();
  });

  it('Should emit an user account', async () => {
    jest.spyOn(component.onClick, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.credit-card-item');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.onClick.emit).toHaveBeenCalledWith(component.userAccounts[0]);
  });

  it('Should emit an user account', async () => {
    jest.spyOn(component.onRemove, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.icon-wrapper');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.onRemove.emit).toHaveBeenCalledWith(component.userAccounts[0]);
  });
});
