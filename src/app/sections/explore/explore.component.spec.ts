import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ExploreService } from '@sections/explore/services/explore.service';
import { NavigationService } from '@shared/services/navigation.service';
import { ExploreComponent } from './explore.component';

describe('ExploreComponent', () => {
  let component: ExploreComponent;
  let fixture: ComponentFixture<ExploreComponent>;

  beforeEach(() => {
    const exploreServiceStub = () => ({ sortedMerchants$: {} });
    const navigationServiceStub = () => ({ navigate: array => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ExploreComponent],
      providers: [
        { provide: ExploreService, useFactory: exploreServiceStub },
        { provide: NavigationService, useFactory: navigationServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ExploreComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
