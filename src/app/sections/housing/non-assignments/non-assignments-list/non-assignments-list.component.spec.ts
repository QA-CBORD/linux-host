import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NonAssignmentListDetails } from "../non-assignments.model";
import { NonAssignmentsListComponent } from "./non-assignments-list.component";

describe("NonAssignmentsListComponent", () => {
  let component: NonAssignmentsListComponent;
  let fixture: ComponentFixture<NonAssignmentsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NonAssignmentsListComponent]
    });
    fixture = TestBed.createComponent(NonAssignmentsListComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
});
