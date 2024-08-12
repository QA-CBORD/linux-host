import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StGlobalNavigationComponent } from './st-global-navigation.component';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule, PopoverController } from '@ionic/angular';
import { GlobalNavService } from './services/global-nav.service';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { Storage } from '@ionic/storage-angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

const popoverControllerStub = {
    dismiss: jest.fn()
};

const settingFacadeStub = {
    fetchSettingList: jest.fn().mockReturnValue(of({})),
    getCachedSettings: jest.fn().mockReturnValue(of([])),
};

const globalSettingFacadeStub = {
    collapseNavBarMenu: jest.fn(),
    expandNavBarMenu: jest.fn()
};

const navigationFacadeSettingsServiceStub = {};

describe('StGlobalNavigationComponent', () => {
    let component: StGlobalNavigationComponent;
    let fixture: ComponentFixture<StGlobalNavigationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, IonicModule, HttpClientTestingModule],
            providers: [
                Storage,
                { provide: NavigationFacadeSettingsService, useValue: navigationFacadeSettingsServiceStub },
                { provide: GlobalNavService, useValue: globalSettingFacadeStub },
                { provide: SettingsFacadeService, useValue: settingFacadeStub },
                { provide: PopoverController, useValue: popoverControllerStub }
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StGlobalNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle list appearance', () => {
        component.isListShown = false;
        component.toggleListAppearance();
        expect(component.isListShown).toBe(true);

        component.isListShown = true;
        component.toggleListAppearance();
        expect(component.isListShown).toBe(false);
    });

    it('should dismiss popup', () => {
        component.onDismissPopup();
        expect(component.isListShown).toBeFalsy();
    });

    it('should unsubscribe on component destroy', () => {
        const unsubscribeSpy = jest.spyOn(component.suscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(unsubscribeSpy).toHaveBeenCalled();
    });

    it('should return a link', () => {
        const url = 'https://example.com';
        const link = component.getLink(url);
        expect(link).toBe("/" + url);
    });

    it('should get navigation elements', () => {
        component.ngOnInit();
        expect(component.navElements$).toBeDefined();
    });

    it('should get activities count', () => {
        component.ngOnInit();
        expect(component.activitiesCount$).toBeDefined();
    });

    it('should set the list shown value', () => {
        component.isListShown = false;
        expect(component.isListShown).toBe(false);

        component.isListShown = true;
        expect(component.isListShown).toBe(true);
    });
});