import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { TileWrapperComponent } from './tile-wrapper.component';
import { LockDownService } from '@shared/services';

const lockDownService = {
  isLockDownOn: jest.fn()
};

const router = {
  url: {}, 
  navigate: jest.fn()
};


describe('TileWrapperComponent', () => {
  let component: TileWrapperComponent;
  let fixture: ComponentFixture<TileWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TileWrapperComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: LockDownService, useValue: lockDownService }
      ]
    });
    fixture = TestBed.createComponent(TileWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should not redirect when lockDown is on', () => {
    const routerSpy = jest.spyOn(router, 'navigate');
    const lockDownSpy = jest.spyOn(lockDownService, 'isLockDownOn').mockResolvedValue(true);
    component.navigateTo('/orders');
    expect(lockDownSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledTimes(0);
  });
});
