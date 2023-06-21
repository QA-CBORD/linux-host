import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MerchantInfo } from '@sections/ordering/shared/models';
import { MerchantListComponent } from './merchant-list.component';

describe('MerchantListComponent', () => {
  let component: MerchantListComponent;
  let fixture: ComponentFixture<MerchantListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [MerchantListComponent]
    });
    fixture = TestBed.createComponent(MerchantListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
