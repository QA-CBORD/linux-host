import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SessionFacadeService } from '@core/facades/session/session.facade.service';
import { CommonService } from '@shared/services/common.service';
import { MessageProxy } from '@shared/services/injectable-message.proxy';
import { GuestDashboard } from './guest-dashboard.component';

describe('GuestDashboard', () => {
    let component: GuestDashboard;
    let fixture: ComponentFixture<GuestDashboard>;
    let commonService: any;
    let router: any;
    let domSanitizer: any;
    let messageProxy: any;
    let sessionFacadeService: any;

    beforeEach(waitForAsync(() => {
        commonService = {
            getInstitutionPhoto: jest.fn(),
            getInstitutionBackgroundImage: jest.fn(),
            getUserName: jest.fn(),
            getInstitutionName: jest.fn(),
            getInstitutionBgColor: jest.fn()
        },

            router = {
                navigate: jest.fn()
            }

        domSanitizer = {}
        messageProxy = {
            get: jest.fn()
        };
        sessionFacadeService = {}

        TestBed.configureTestingModule({
            declarations: [GuestDashboard],
            providers: [
                { provide: CommonService, useValue: commonService },
                { provide: DomSanitizer, useValue: domSanitizer },
                { provide: Router, useValue: router },
                { provide: MessageProxy, useValue: messageProxy },
                { provide: SessionFacadeService, useValue: sessionFacadeService }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GuestDashboard);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});