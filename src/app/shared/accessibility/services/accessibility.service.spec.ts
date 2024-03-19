import { TestBed } from '@angular/core/testing';
import { AccessibilityService, PLATFORM } from './accessibility.service';
import { Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AccessibleSelectModule } from '../directives/accessible-select.module';
import { ScreenReader } from '@capacitor/screen-reader';
import { Capacitor } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';

const htmlMock = [{ item: { style: { display: '' } }, namedItem: {} }] as any;

describe(AccessibilityService, () => {
  let service: AccessibilityService;
  let _platform, _capacitor, _screenReader, _translateService;

  beforeEach(() => {
    _platform = {
      is: jest.fn(() => true),
    };
    _capacitor = { getPlatform: jest.fn(() => PLATFORM.ios) };
    _screenReader = {
      isEnabled: jest.fn(() =>
        Promise.resolve({
          value: true,
        })
      ),
      speak: jest.fn(value => Promise.resolve()),
    };

    TestBed.configureTestingModule({
      imports: [CommonModule, AccessibleSelectModule],
      providers: [
        { provide: Platform, useValue: _platform },
        { provide: ScreenReader, useValue: _screenReader },
        { provide: Capacitor, useValue: _capacitor },
        { provide: TranslateService, useValue: _translateService },
      ],
    });

    service = TestBed.inject(AccessibilityService);
  });

  afterEach(() => {
    _platform.is.mockReset();
    _capacitor.getPlatform.mockReset();
    _screenReader.isEnabled.mockReset();
    _screenReader.speak.mockReset();
  });

  it('should create the service', () => {
    service = new AccessibilityService(_platform, _translateService);
    expect(service).toBeTruthy();
  });

  it('should not read the message if platform is not capacitor', () => {
    const platformMock = jest.spyOn(_platform, 'is').mockReturnValue(false);
    service.readAloud('hello');
    expect(platformMock).toHaveBeenCalledTimes(1);
  });

  it('should read the message if platform is capacitor', () => {
    const value = 'hello';
    const platformMock = jest.spyOn(_platform, 'is').mockReturnValue(true);
    const screenReaderMock1 = jest
      .spyOn(ScreenReader, 'isEnabled')
      .mockImplementation(() => Promise.resolve({ value: true }));
    const screenReaderMock2 = jest.spyOn(ScreenReader, 'speak').mockImplementation(({ value }) => Promise.resolve());
    service.readAloud(value);
    expect(platformMock).toHaveBeenCalledTimes(1);
    expect(screenReaderMock1).toHaveBeenCalledTimes(1);
    setTimeout(() => {
      expect(screenReaderMock2).toHaveBeenCalledTimes(1);
    }, 20000);
  });

  it('should return false if voice over could not be used', () => {
    expect(service.isVoiceOverEnabled$).toBeTruthy();
  });

  it('should return true if voice over could not be used', () => {
    const platformMock = jest.spyOn(Capacitor, 'getPlatform').mockReturnValue(PLATFORM.ios);
    const screenReaderMock1 = jest
      .spyOn(ScreenReader, 'isEnabled')
      .mockImplementation(() => Promise.resolve({ value: true }));
    expect(service.isVoiceOverEnabled$).toBeTruthy();
    expect(platformMock).toHaveBeenCalledTimes(1);
    expect(screenReaderMock1).toHaveBeenCalledTimes(2);
  });

  it('should return false if voice over is not enabled', () => {
    const platformMock = jest.spyOn(Capacitor, 'getPlatform').mockReturnValue(PLATFORM.ios);
    const screenReaderMock1 = jest
      .spyOn(ScreenReader, 'isEnabled')
      .mockImplementation(() => Promise.resolve({ value: false }));
    expect(service.isVoiceOverEnabled$).toBeTruthy();
    expect(platformMock).toHaveBeenCalledTimes(3);
    expect(screenReaderMock1).toHaveBeenCalledTimes(3);
  });

  it('should return false voice is enabled', () => {
    const platformMock = jest.spyOn(Capacitor, 'getPlatform').mockReturnValue(PLATFORM.ios);
    const screenReaderMock1 = jest
      .spyOn(ScreenReader, 'isEnabled')
      .mockImplementation(() => Promise.resolve({ value: false }));
    expect(service.isVoiceOverClick$).toBeTruthy();
    expect(platformMock).toHaveBeenCalledTimes(4);
    expect(screenReaderMock1).toHaveBeenCalledTimes(4);
  });

  it('should return true voice is enabled', () => {
    const platformMock = jest.spyOn(Capacitor, 'getPlatform').mockReturnValue(PLATFORM.ios);
    const screenReaderMock1 = jest
      .spyOn(ScreenReader, 'isEnabled')
      .mockImplementation(() => Promise.resolve({ value: true }));
    expect(service.isVoiceOverClick$).toBeTruthy();
    expect(platformMock).toHaveBeenCalledTimes(5);
    expect(screenReaderMock1).toHaveBeenCalledTimes(5);
  });

  it('should hide elements by class name default', () => {
    const elementsMock = jest.spyOn(document, 'getElementsByClassName').mockReturnValue(htmlMock);
    const platformMock = jest.spyOn(Capacitor, 'getPlatform').mockReturnValue(PLATFORM.ios);
    const screenReaderMock1 = jest
      .spyOn(ScreenReader, 'isEnabled')
      .mockImplementation(() => Promise.resolve({ value: true }));
    expect(service.hideElementsByClassName()).toBeTruthy();
    expect(platformMock).toHaveBeenCalledTimes(7);
    expect(screenReaderMock1).toHaveBeenCalledTimes(6);
    expect(elementsMock).toBeTruthy();
  });
});
