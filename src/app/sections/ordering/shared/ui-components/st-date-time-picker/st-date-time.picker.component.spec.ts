import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { StDateTimePickerComponent } from "./st-date-time-picker.component";
import { CoreTestingModules } from "src/app/testing/core-modules";
import { StButtonModule } from "@shared/ui-components/st-button";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { OrderingService } from "@sections/ordering/services/ordering.service";
import { AndroidPermissions } from "@awesome-cordova-plugins/android-permissions/ngx";

describe('StDateTimePicker', () => {

    let component: StDateTimePickerComponent;
    let fixture: ComponentFixture<StDateTimePickerComponent>;

    beforeEach(
        waitForAsync(() => {
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

        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });
});
