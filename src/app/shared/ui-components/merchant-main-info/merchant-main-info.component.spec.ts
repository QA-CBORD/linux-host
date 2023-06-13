import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MerchantMainInfoComponent } from './merchant-main-info.component';

describe('MerchantMainInfoComponent', () => {
  let component: MerchantMainInfoComponent;
  let fixture: ComponentFixture<MerchantMainInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MerchantMainInfoComponent]
    });
    fixture = TestBed.createComponent(MerchantMainInfoComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`isShowOrderType has default value`, () => {
    expect(component.isShowOrderType).toEqual(true);
  });

  it(`isWalkOut has default value`, () => {
    expect(component.isWalkOut).toEqual(false);
  });

  it(`isShowMerchantStatus has default value`, () => {
    expect(component.isShowMerchantStatus).toEqual(true);
  });
});
