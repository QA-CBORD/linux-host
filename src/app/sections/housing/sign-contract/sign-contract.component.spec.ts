import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignContractComponent } from './sign-contract.component';

describe('SignContractComponent', () => {
  let component: SignContractComponent;
  let fixture: ComponentFixture<SignContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignContractComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('#signContract method', () => {
  //   it('should toggle isSigned', () => {
  //     component.isSigned = false;
  //
  //     component.signContract();
  //
  //     expect(component.isSigned).toBe(true);
  //
  //     component.signContract();
  //
  //     expect(component.isSigned).toBe(false);
  //   });
  //
  //   it('should set dateTime', () => {
  //     const dateTime: string = new Date().toISOString();
  //     const fakeSignContract = () => {
  //       component.dateTime = dateTime;
  //     };
  //
  //     spyOn(component, 'signContract').and.callFake(fakeSignContract);
  //
  //     component.signContract();
  //
  //     expect(component.dateTime).toBe(dateTime);
  //   });
  //
  //   it('should emit event', () => {
  //     const dateTime: string = new Date().toISOString();
  //     const signEvent: SignContractEvent = new SignContractEvent(true, dateTime);
  //
  //     spyOn(component.signed, 'emit');
  //
  //     // const fakeSignContract = () => {
  //     //   component.signed.emit(signEvent);
  //     // };
  //
  //     // spyOn(component, 'signContract').and.callFake(fakeSignContract);
  //
  //     component.signContract();
  //
  //     expect(component.signed.emit).toHaveBeenCalledWith(signEvent);
  //   });
  // });
});
