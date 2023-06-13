import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HousingTileComponent } from './housing-tile.component';

describe('HousingTileComponent', () => {
  let component: HousingTileComponent;
  let fixture: ComponentFixture<HousingTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HousingTileComponent]
    });
    fixture = TestBed.createComponent(HousingTileComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
