import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { StepperComponent } from "./stepper.component";

describe("StepperComponent", () => {
  let component: StepperComponent;
  let fixture: ComponentFixture<StepperComponent>;

  beforeEach(() => {
    const changeDetectorRefStub = () => ({ markForCheck: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [StepperComponent],
      providers: [
        { provide: ChangeDetectorRef, useFactory: changeDetectorRefStub }
      ]
    });
    fixture = TestBed.createComponent(StepperComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  describe("ngAfterViewInit", () => {
    it("makes expected calls", () => {
      const changeDetectorRefStub: ChangeDetectorRef = fixture.debugElement.injector.get(
        ChangeDetectorRef
      );
     jest.spyOn(changeDetectorRefStub, "markForCheck");
      component.ngAfterViewInit();
      expect(changeDetectorRefStub.markForCheck).toHaveBeenCalled();
    });
  });
});
