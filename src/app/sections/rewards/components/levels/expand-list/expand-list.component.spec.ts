import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, QueryList } from '@angular/core';
import { UserTrackLevelInfo } from '../../../models';
import { ExpandListComponent } from './expand-list.component';
import { ExpandItemComponent } from './expand-item';
import { levelInfo } from './expand-item/expand-item.component.spec';

describe('ExpandListComponent', () => {
  let component: ExpandListComponent;
  let fixture: ComponentFixture<ExpandListComponent>;
  let componentb: ExpandItemComponent;
  let fixtureb: ComponentFixture<ExpandItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExpandListComponent],
    });
    fixture = TestBed.createComponent(ExpandListComponent);
    component = fixture.componentInstance;
    fixtureb = TestBed.createComponent(ExpandItemComponent);
    componentb = fixtureb.componentInstance;
    component.children = new QueryList<ExpandItemComponent>();
    component.children.reset([componentb]);
    componentb.levelInfo = levelInfo;
    componentb.closeExpand = jest.fn();

  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });


  it('trackFn', () => {
    const index = 0;
    const level = 0;
    const userTrackLevelInfo = { level } as UserTrackLevelInfo;
    expect(component.trackFn(index, userTrackLevelInfo)).toEqual(level);
  });

    it('onExpandHandler', () => {
    const level = 0;
    component.level = 0;
    component.onExpandHandler(level);
    expect(component.level).toEqual(level);
  });



  it('closeExpand', () => {
    component.level = levelInfo.level;
    component['closeExpand']();
    expect(componentb.show).toEqual(false);
  });
  it('should close expand if this.level is not null and level is not null', () => {
    component.level = levelInfo.level;
    component.onExpandHandler(levelInfo.level);
    expect(component.level).toEqual(10);
  });

  it('should not close expand if this.level is null and level is not null', () => {
    component.onExpandHandler(levelInfo.level); 
    expect(component.level).toEqual(10);
  });

  it('should not close expand and set this.level to null if level is null', () => {
    component.level = 5;
    component.onExpandHandler(null);
    expect(component.level).toBeNull();
  });
}
);