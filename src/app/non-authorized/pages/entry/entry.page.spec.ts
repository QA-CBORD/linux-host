import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Platform } from '@ionic/angular';
import { CoreTestingModules } from 'src/app/testing/core-modules';
import { EntryPage } from './entry.page';
import { CoreProviders } from 'src/app/testing/core-providers';
import { of } from 'rxjs';

describe('EntryPage', () => {
  let component: EntryPage;
  let fixture: ComponentFixture<EntryPage>;
  let platform: any;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [EntryPage],
        imports: [...CoreTestingModules],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [...CoreProviders],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPage);
    component = fixture.componentInstance;

    fixture.detectChanges();
    platform = TestBed.inject(Platform);
  });

  it('should create', () => {
    platform.pause.mockReturnValue(of(true));

    expect(component).toBeTruthy();
  });
});
