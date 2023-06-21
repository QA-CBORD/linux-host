import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NonAssignmentsStateService } from "./non-assignments-state.service";
import { NonAssignmentsComponent } from "./non-assignments.component";

describe("NonAssignmentsComponent", () => {
  let component: NonAssignmentsComponent;
  let fixture: ComponentFixture<NonAssignmentsComponent>;

  beforeEach(() => {
    const nonAssignmentsStateServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NonAssignmentsComponent],
      providers: [
        {
          provide: NonAssignmentsStateService,
          useFactory: nonAssignmentsStateServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(NonAssignmentsComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
});
