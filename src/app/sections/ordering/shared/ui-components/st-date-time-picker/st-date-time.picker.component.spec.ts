import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { StDateTimePickerComponent } from "./st-date-time-picker.component";
import { CoreTestingModules } from "src/app/testing/core-modules";
import { StButtonModule } from "@shared/ui-components/st-button";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { OrderingService } from "@sections/ordering/services/ordering.service";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions/ngx";
import { IonPicker } from "@ionic/angular";


describe('StDateTimePicker', () => {

    let component: StDateTimePickerComponent;
    let fixture: ComponentFixture<StDateTimePickerComponent>;
    let mockIonPicker: Partial<IonPicker>;

    beforeEach(
        waitForAsync(() => {
            mockIonPicker = {
                present: jest.fn(),
                dismiss: jest.fn()
            };
            TestBed.configureTestingModule({
                declarations: [StDateTimePickerComponent],
                imports: [
                    ...CoreTestingModules,
                    StButtonModule
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                providers: [OrderingService, AndroidPermissions],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(StDateTimePickerComponent);
        component = fixture.componentInstance;
        component.timePicker = mockIonPicker as IonPicker;

        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should listen for appStateChange to close modal when app is on foreground', () => {
        const timepickerChild: IonPicker = fixture.componentInstance.timePicker;
        const spy = jest.spyOn(component, 'listenAppChanges');
        component.ngOnInit();
        expect(timepickerChild).toBeDefined();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
