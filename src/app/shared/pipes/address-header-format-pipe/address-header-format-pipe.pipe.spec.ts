import { TestBed } from '@angular/core/testing';
import { AddressInfo } from '@core/model/address/address-info';
import { AddressHeaderFormatPipe } from './address-header-format-pipe.pipe';

describe('AddressHeaderFormatPipe', () => {
  let pipe: AddressHeaderFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AddressHeaderFormatPipe] });
    pipe = TestBed.inject(AddressHeaderFormatPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
