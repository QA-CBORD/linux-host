import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { IonPicker } from '@ionic/angular';
import { OrderingComponentContentStrings, OrderingService } from '@sections/ordering/services/ordering.service';
import { StButtonModule } from '@shared/ui-components/st-button';
import { of } from 'rxjs';
import { CoreTestingModules } from 'src/app/testing/core-modules';
import { CoreProviders } from 'src/app/testing/core-providers';
import { StDateTimePickerComponent } from './st-date-time-picker.component';
import { AppStatesFacadeService } from '@core/facades/appEvents/app-events.facade.service';
import { TranslateFacadeService } from '@core/facades/translate/translate.facade.service';

describe('StDateTimePicker', () => {
  let component: StDateTimePickerComponent;
  let fixture: ComponentFixture<StDateTimePickerComponent>;
  let mockIonPicker: Partial<IonPicker>;
  let appStatesFacadeService;

  beforeEach(async () => {
    mockIonPicker = {
      present: jest.fn(),
      dismiss: jest.fn(),
    };

    appStatesFacadeService = {
      getStateChangeEvent$: of({ isActive: false }),
    };

    await TestBed.configureTestingModule({
      imports: [StDateTimePickerComponent, ...CoreTestingModules, StButtonModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        OrderingService,
        AndroidPermissions,
        ...CoreProviders,
        {
          provide: AppStatesFacadeService,
          useValue: appStatesFacadeService,
        },
        {
          provide: TranslateFacadeService,
          useValue: {
            orderingInstant: jest.fn(),
          }
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StDateTimePickerComponent);
    component = fixture.componentInstance;
    component.timePicker = mockIonPicker as IonPicker;
    component.schedule = {
      menuSchedule: [
        {
          day: 1,
          time: '',
          menuId: '',
        },
      ],
      days: [{ date: '2022-12-31', dayOfWeek: 1, hourBlocks: [] }],
    };
    component.userData = {
      locale: 'en-US',
      timeZone: 'America/New_York',
      id: '123',
      userName: 'test',
      firstName: 'test',
      lastName: 'test',
      staleProfile: false,
      active: true,
      cashlessMediaStatus: 1,
      email: 'd@d.com',
      guestUser: false,
      hasCashlessCard: false,
      institutionId: '123',
      lastUpdatedProfile: new Date(),
      middleName: 'test',
      objectRevision: 1,
      phone: '123',
      status: 1,
      lastUpdatedCashless: new Date(),
      emailBounceMessage: 'test',
      emailBounceStatus: 'test',
      userNotificationInfoList: [],
    };
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Fix tests
  //   it('should listen for appStateChange to close modal when app is on foreground', () => {
  //     const timepickerChild: IonPicker = fixture.componentInstance.timePicker;
  //     const spy = jest.spyOn(component, 'listenAppChanges');
  //     expect(timepickerChild).toBeDefined();
  //     expect(spy).toHaveBeenCalledTimes(1);
  //   });

  it('should not close when app is active', () => {
    const closeSpy = jest.spyOn(component, 'close');
    appStatesFacadeService.getStateChangeEvent$ = of({ isActive: true });

    component.listenAppChanges();

    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should return true when dateTimePicker is a string', () => {
    component.dateTimePicker = 'test string';
    expect(component.isDefaultState).toBe(true);
  });

  it('should return false when dateTimePicker is not a string', () => {
    component.dateTimePicker = new Date('2022-12-31');
    expect(component.isDefaultState).toBe(false);
  });

  it('should click on the picker-hidden-confirm button when confirmPicker is called', async () => {
    const button = document.createElement('button');
    button.className = 'picker-hidden-confirm';
    document.body.appendChild(button);

    const clickSpy = jest.spyOn(button, 'click');

    await component.confirmPicker();

    expect(clickSpy).toHaveBeenCalled();

    document.body.removeChild(button);
  });

  it('should update prevSelectedTimeInfo and call createColumns when handlePickerChange is called with name 1', () => {
    const event = {
      detail: {
        name: 1,
        selectedIndex: 0,
        options: [{ text: 'option1' }],
      },
    };

    const createColumnsSpy = jest.spyOn(component, 'createColumns' as any).mockReturnValue('Mocked Columns');

    component.handlePickerChange(event);

    expect((component as any).prevSelectedTimeInfo).toEqual({ currentIdx: 0, maxValue: false, prevIdx: 0 });
    expect(createColumnsSpy).toHaveBeenCalled();
  });

  it('should update prevSelectedTimeInfo, selectedDayIdx and call createColumns when handlePickerChange is called with name not equal to 1', () => {
    const event = {
      detail: {
        name: 2,
        selectedIndex: 0,
        options: [{ text: 'option1' }],
      },
    };

    const createColumnsSpy = jest.spyOn(component, 'createColumns' as any).mockReturnValue('Mocked Columns');

    component.handlePickerChange(event);

    expect((component as any).prevSelectedTimeInfo).toEqual({ currentIdx: 0, maxValue: true, prevIdx: 0 });
    expect((component as any).selectedDayIdx).toBe(0);
    expect(createColumnsSpy).toHaveBeenCalled();
  });

  it('should open the picker', async () => {
    const spy = jest.spyOn(component, 'updateAsapOption');
    // Call the method to test
    await component.openPicker();

    expect(spy).toBeCalled();
  });

  it('should open the picker with class', async () => {
    component.useBackButton = false;
    const spy = jest.spyOn(component, 'updateAsapOption');
    // Call the method to test
    await component.openPicker();

    expect(spy).toBeCalled();
  });

  it('should return the correct timestamp', () => {
    component.schedule = {
      menuSchedule: [],
      days: [
        {
          date: '2022-01-01',
          dayOfWeek: 1,
          hourBlocks: [
            {
              timestamps: ['timestamp1', 'timestamp2'],
              hour: 12,
              minuteBlocks: [0, 30],
              periods: [],
              timeZonedDate: '2022-01-01T12:00:00.000Z',
            },
          ],
        },
      ],
    };

    expect(component['getTimeStamp']('2022-01-01', 12, 30)).toBe('timestamp2');
  });

  it('should return null if no timestamp is found', () => {
    component.schedule = {
      menuSchedule: [],
      days: [
        {
          date: '2022-01-01',
          dayOfWeek: 1,
          hourBlocks: [
            {
              timestamps: ['timestamp1'],
              hour: 12,
              minuteBlocks: [],
              periods: [],
              timeZonedDate: '2022-01-01T12:00:00.000Z',
            },
          ],
        },
      ],
    };

    expect(component['getTimeStamp']('2022-01-01', 12, 30)).toBeUndefined();
  });

  it('should return false if timestamps do not exist', () => {
    component.schedule = {
      menuSchedule: [],
      days: [
        {
          date: '2022-01-01',
          dayOfWeek: 1,
          hourBlocks: [
            {
              timestamps: [],
              hour: 12,
              minuteBlocks: [],
              periods: [],
              timeZonedDate: '2022-01-01T12:00:00.000Z',
            },
          ],
        },
      ],
    };

    expect(component['hasTimeStamp']()).toBe(false);
  });

  it('should return true if timestamps exist', () => {
    component.schedule = {
      menuSchedule: [],
      days: [
        {
          hourBlocks: [
            {
              timestamps: ['timestamp1', 'timestamp2'],
              hour: 10,
              minuteBlocks: [],
              periods: [],
              timeZonedDate: '2022-01-01T10:00:00.000Z',
            },
          ],
          date: '2022-01-01',
          dayOfWeek: 1,
        },
      ],
    };

    expect(component['hasTimeStamp']()).toBe(true);
  });
});
