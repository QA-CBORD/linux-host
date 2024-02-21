import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccessCardComponent } from './access-card.component';
import { AccessCardService } from './services/access-card.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalController, PopoverController } from '@ionic/angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { Storage } from '@ionic/storage';
import { MockStorageService } from '@core/states/storage/storage-state-mock.service';
import { ToastService } from '@core/service/toast/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CONTENT_STRINGS_CATEGORIES, CONTENT_STRINGS_DOMAINS, CONTENT_STRINGS_MESSAGES } from 'src/app/content-strings';
import { of } from 'rxjs';

describe('AccessCardComponent', () => {
  let component: AccessCardComponent;
  let fixture: ComponentFixture<AccessCardComponent>;

  const toastService = {
    showToast: jest.fn(() => ({
      onDidDismiss: jest.fn().mockResolvedValue({ data: true }),
    })),
    showError: jest.fn(() => Promise.resolve()),
  };

  const translateService = {
    instant: jest.fn(),
  };

  const contentStringsFacadeService = { fetchContentString$: jest.fn(() => of('hello world')) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AccessCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: {} },
        { provide: PopoverController, useValue: {} },
        { provide: Storage, useClass: MockStorageService },
        { provide: ToastService, useValue: toastService },
        { provide: TranslateService, useValue: translateService },
        { provide: ContentStringsFacadeService, useValue: contentStringsFacadeService },
        MobileCredentialFacade,
        AndroidPermissions,
        AccessCardService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchContentString$ method of contentStringsFacadeService with correct parameters', fakeAsync(() => {
    const fetchContentStringSpy = jest.spyOn(contentStringsFacadeService, 'fetchContentString$');

    fixture.detectChanges();
    tick();
    component.initContentString();
    tick();

    expect(fetchContentStringSpy).toHaveBeenCalledWith(
      CONTENT_STRINGS_DOMAINS.get_mobile,
      CONTENT_STRINGS_CATEGORIES.photoUpload,
      CONTENT_STRINGS_MESSAGES.requiredMessage
    );
  }));
});
