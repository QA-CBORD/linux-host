import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AttachmentsComponent } from './attachments.component';
import { ActivatedRoute } from '@angular/router';
import { AttachmentStateService } from './attachments-state.service';
import { TermsService } from '../terms/terms.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { statusBarForm } from '../../../../app/app.global';
import { HttpClientModule } from '@angular/common/http';
import { AngularDelegate, ModalController, PopoverController } from '@ionic/angular';

describe('AttachmentsComponent', () => {
  let component: AttachmentsComponent;
  let fixture: ComponentFixture<AttachmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([{ path: 'patron/housing/attachments/test', component: AttachmentsComponent }]),
      ],
      declarations: [AttachmentsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                checkIn: true,
              },
            },
            navigateByUrl: jest.fn(),
          },
        },
        {
          provide: AttachmentStateService,
          userValue: {},
        },
        {
          provide: TermsService,
          userValue: {
            termId$: of('termId1'),
          },
        },
        ModalController,
        AngularDelegate,
        PopoverController,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call _initTermsSubscription', () => {
      const spy = jest.spyOn(component as any, '_initTermsSubscription');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('_initTermsSubscription', () => {
    it('should set urlEditForm', done => {
      component._termService.termId$ = of('test') as any;
      component['_initTermsSubscription']();
      done();
      expect(component.urlEditForm).toBe(`/patron/housing/attachment/test/`);
    });
  });

  describe('ngOnDestroy', () => {
    it('should call destroy', () => {
      const destroy = jest.spyOn(component['_subscription'], 'unsubscribe');
      component.ngOnDestroy();
      expect(destroy).toHaveBeenCalled();
    });
  });

  describe('getStatus', () => {
    it('should return status NEW id key is undefined', () => {
      const result = component.getStatus(0);
      expect(result).toBe(statusBarForm.NEW);
    });

    it('should return status NEW id key is defined', () => {
      const result = component.getStatus(10);
      expect(result).toBe(statusBarForm.SUBMITTED);
    });
  });

  describe('createAttachmentDefault', () => {
    it('should navigate using router', () => {
      const navigate = jest.spyOn(component['router'], 'navigateByUrl');
      component.createAttachmentDefault('test');
      expect(navigate).toHaveBeenCalledWith(`/patron/housing/attachments/${'test'}`);
    });
  });

  describe('getPath', () => {
    it('should return path', () => {
      const result = component.getPath(10);
      expect(result).toBe(`/patron/housing/attachments/${10}`);
    });
  });
});
