import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { MerchantCardComponent } from './merchant-card.component';

describe('MerchantCardComponent', () => {
  let component: MerchantCardComponent;
  let fixture: ComponentFixture<MerchantCardComponent>;

  beforeEach(() => {
    const environmentFacadeServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MerchantCardComponent],
      providers: [
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(MerchantCardComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
