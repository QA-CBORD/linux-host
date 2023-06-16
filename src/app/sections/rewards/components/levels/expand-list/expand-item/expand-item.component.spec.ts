import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ClaimableRewardInfo } from '../../../../models';
import { ExpandItemComponent } from './expand-item.component';

describe('ExpandItemComponent', () => {
  let component: ExpandItemComponent;
  let fixture: ComponentFixture<ExpandItemComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ detectChanges: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExpandItemComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub }
      ]
    });
    fixture = TestBed.createComponent(ExpandItemComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`show has default value`, () => {
    expect(component.show).toEqual(false);
  });

  describe('closeExpand', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
     jest.spyOn(changeDetectorRefStub, 'detectChanges');
      component.closeExpand();
      expect(changeDetectorRefStub.detectChanges).toHaveBeenCalled();
    });
  });
});
