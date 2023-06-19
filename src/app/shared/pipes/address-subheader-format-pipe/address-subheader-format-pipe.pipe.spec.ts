import { TestBed } from '@angular/core/testing';
import { AddressInfo } from '@core/model/address/address-info';
import { AddressSubHeaderFormatPipe } from './address-subheader-format-pipe.pipe';

describe('AddressSubHeaderFormatPipe', () => {
  let pipe: AddressSubHeaderFormatPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AddressSubHeaderFormatPipe] });
    pipe = TestBed.inject(AddressSubHeaderFormatPipe);
  });

  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
