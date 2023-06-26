import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RadioGroupCustomEvent } from '@ionic/angular';
import { DepositFrequencyComponent } from './deposit-frequency.component';

describe('DepositFrequencyComponent', () => {
  let component: DepositFrequencyComponent;
  let fixture: ComponentFixture<DepositFrequencyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DepositFrequencyComponent]
    });
    fixture = TestBed.createComponent(DepositFrequencyComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
