import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SortControlComponent } from "./sort-control/sort-control.component";
import { FilterSortComponent } from "./filter-sort.component";

describe("FilterSortComponent", () => {
  let component: FilterSortComponent;
  let fixture: ComponentFixture<FilterSortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FilterSortComponent]
    });
    fixture = TestBed.createComponent(FilterSortComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  describe("sort", () => {
    it("makes expected calls", () => {
      const sortControlComponentStub: SortControlComponent = <any>{ isSelected: true, select: () => true};
     jest.spyOn(component, "unselectAll");
      fixture.detectChanges();
      component.sort(sortControlComponentStub);
      expect(component.unselectAll).toHaveBeenCalledTimes(0);
    });
  });
});
