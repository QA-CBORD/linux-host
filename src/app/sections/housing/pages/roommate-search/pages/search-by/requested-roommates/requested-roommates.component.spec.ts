import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedRoommatesComponent } from './requested-roommates.component';

describe('RequestedRoommatesComponent', () => {
  let component: RequestedRoommatesComponent;
  let fixture: ComponentFixture<RequestedRoommatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedRoommatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedRoommatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
