import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RewardsService } from '../../services';
import { BalanceComponent } from './balance.component';

describe('BalanceComponent', () => {
  let component: BalanceComponent;
  let fixture: ComponentFixture<BalanceComponent>;

  beforeEach(() => {
    const rewardsServiceStub = () => ({
      getContentValueByName: balanceLabel => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BalanceComponent],
      providers: [{ provide: RewardsService, useFactory: rewardsServiceStub }]
    });
    fixture = TestBed.createComponent(BalanceComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
