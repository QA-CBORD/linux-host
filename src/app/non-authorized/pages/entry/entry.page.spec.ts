import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoreTestingModules } from 'src/app/testing/core-modules';
import { EntryPage } from './entry.page';
import { CoreProviders, routerMock } from 'src/app/testing/core-providers';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ANONYMOUS_ROUTES } from '../../non-authorized.config';
import { ROLES } from 'src/app/app.global';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';

describe('EntryPage', () => {
  let component: EntryPage;
  let fixture: ComponentFixture<EntryPage>;
  let environmentFacadeService = {
    resetEnvironmentAndCreateSession: jest.fn(),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntryPage],
      imports: [...CoreTestingModules, AppRoutingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [...CoreProviders, { provide: EnvironmentFacadeService, useValue: environmentFacadeService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to institutions', () => {
    component.redirectTo();
    expect(routerMock.navigate).toHaveBeenCalledWith([ROLES.anonymous, ANONYMOUS_ROUTES.institutions]);
  });
});
