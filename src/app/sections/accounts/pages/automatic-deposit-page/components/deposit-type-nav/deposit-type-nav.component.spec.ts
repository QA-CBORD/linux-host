import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { DepositTypeNavComponent } from './deposit-type-nav.component';

describe('DepositTypeNavComponent', () => {
  let component: DepositTypeNavComponent;
  let fixture: ComponentFixture<DepositTypeNavComponent>;

  beforeEach(() => {
    const settingsFacadeServiceStub = () => ({
      getSetting: aUTO_DEPOSIT_ENABLED => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DepositTypeNavComponent],
      providers: [
        {
          provide: SettingsFacadeService,
          useFactory: settingsFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(DepositTypeNavComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
