import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SimpleChanges } from "@angular/core";
import { AddToFavoriteComponent } from "./add-to-favorite.component";

describe("AddToFavoriteComponent", () => {
  let component: AddToFavoriteComponent;
  let fixture: ComponentFixture<AddToFavoriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddToFavoriteComponent]
    });
    fixture = TestBed.createComponent(AddToFavoriteComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`active has default value`, () => {
    expect(component.active).toEqual(false);
  });
});
