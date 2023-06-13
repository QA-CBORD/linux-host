import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HTMLRendererComponent } from './html-renderer.component';

describe('HTMLRendererComponent', () => {
  let component: HTMLRendererComponent;
  let fixture: ComponentFixture<HTMLRendererComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ markForCheck: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HTMLRendererComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub }
      ]
    });
    fixture = TestBed.createComponent(HTMLRendererComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
      spyOn(changeDetectorRefStub, 'markForCheck').and.callThrough();
      component.ngOnInit();
      expect(changeDetectorRefStub.markForCheck).toHaveBeenCalled();
    });
  });
});
