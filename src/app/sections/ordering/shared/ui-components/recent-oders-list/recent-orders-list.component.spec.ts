import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { OrderInfo } from "../../models";
import { RecentOrdersListComponent } from "./recent-orders-list.component";

describe("RecentOrdersListComponent", () => {
  let component: RecentOrdersListComponent;
  let fixture: ComponentFixture<RecentOrdersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [RecentOrdersListComponent]
    });
    fixture = TestBed.createComponent(RecentOrdersListComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`propertyName has default value`, () => {
    expect(component.propertyName).toEqual(`dueTime`);
  });
});
