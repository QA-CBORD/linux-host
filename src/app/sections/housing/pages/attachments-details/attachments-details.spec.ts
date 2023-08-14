import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttachmentsDetailsPage } from './attachments-details.page';
import { LoadingService } from '@core/service/loading/loading.service';
import { AttachmentsService } from '@sections/housing/attachments/attachments.service';
import { AttachmentStateService } from '@sections/housing/attachments/attachments-state.service';
import { TermsService } from '@sections/housing/terms/terms.service';
import { Chooser } from '@awesome-cordova-plugins/chooser/ngx';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HousingService } from '@sections/housing/housing.service';
import { ToastService } from '@core/service/toast/toast.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { _alertController } from '../roommate-search/pages/search-results/search-results.page.spec';
import { of } from 'rxjs';

describe('Attachment details', () => {
  const _loadingService = {};
  const _attachmentService = {
    findAttachment: jest.fn().mockReturnValue({}),
    getAttachmentFile: jest.fn().mockReturnValue(of(" "))
  };
  const _termService = {};
  const chooser = {};
  const identityFacadeService = {};
  const _route = {
    snapshot: {
        params: {
            attachmentKey: 151
        }
    }
  };
  const _housingService = {};
  const _toastService = {};

  let fixture: ComponentFixture<AttachmentsDetailsPage>;
  let component: AttachmentsDetailsPage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AttachmentsDetailsPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: LoadingService, useValue: _loadingService },
        { provide: AttachmentsService, useValue: _attachmentService },
        { provide: AttachmentStateService, useValue: _attachmentService },
        { provide: TermsService, useValue: _termService },
        { provide: Chooser, useValue: chooser },
        { provide: IdentityFacadeService, useValue: identityFacadeService },
        { provide: ActivatedRoute, useValue: _route },
        { provide: AlertController, useValue: _alertController },
        { provide: HousingService, useValue: _housingService },
        { provide: ToastService, useValue: _toastService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AttachmentsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // 	bGlnaHQgd29yay4=
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
