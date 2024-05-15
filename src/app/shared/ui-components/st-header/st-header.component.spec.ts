import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController, PopoverController } from '@ionic/angular';
import { StHeaderComponent } from './st-header.component';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { Storage } from '@ionic/storage';
import { MockStorageService } from '@core/states/storage/storage-state-mock.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateServiceStub } from '@sections/notifications/notifications.component.spec';

const modalController = {
  create: jest.fn(),
};

const popoverCtrl = {};

const nativeProvider = {
  isMobile: jest.fn(() => true),
};

const router = {
  navigate: jest.fn().mockResolvedValue(Promise.resolve(true)),
};

describe('StHeaderComponent', () => {
  let component: StHeaderComponent;
  let fixture: ComponentFixture<StHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule],
      declarations: [StHeaderComponent],
      providers: [
        { provide: ModalController, useValue: modalController },
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: NativeProvider, useValue: nativeProvider },
        { provide: Storage, useClass: MockStorageService },
        { provide: Router, useValue: router },
        { provide: TranslateService, useClass: TranslateServiceStub },

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the about page', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss the modal', () => {
    const spy = jest.spyOn(component.onDismiss, 'emit');
    component.isToolbarShow = true;
    component.isDismissButtonShow = true;
    component.backButtonTitle = 'Back';

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('ion-button'));
    button.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should emit searchedValue event with input value on input change', () => {
    const value = 'test';
    const onSearchedValueSpy = jest.spyOn(component.onSearchedValue, 'emit');

    component.onInputChanged({ target: { value } });

    expect(onSearchedValueSpy).toHaveBeenCalledWith(value);
  });

  it('should emit onRemove event when trash icon is clicked', () => {
    const spy = jest.spyOn(component.onRemove, 'emit');
    component.isToolbarShow = true;
    component.isRemoveButtonShow = true;
    component.showTrashIcon = true;

    fixture.detectChanges();
    const iconButton = fixture.debugElement.query(By.css('.trash-icon'));
    iconButton.triggerEventHandler('click', null);

    expect(spy).toHaveBeenCalled();
  });

  it('should have an icon with an accesible text', () => {
    component.isToolbarShow = true;
    component.isRemoveButtonShow = true;
    component.showTrashIcon = true;

    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('ion-icon'));
    expect(icon).toHaveAttribute('aria-label', 'patron-ui.ordering.cart_preview_trash_icon');
  });

  it('should not hide keyboard on enter key click if not mobile device', async () => {
    const isMobileSpy = jest.spyOn(nativeProvider, 'isMobile').mockReturnValue(false);
    await component.onEnterKeyClicked();
    expect(isMobileSpy).toHaveBeenCalled();
  });

  it('should not hide keyboard on enter key click if not mobile device', async () => {
    const isMobileSpy = jest.spyOn(nativeProvider, 'isMobile').mockReturnValue(true);
    await component.onEnterKeyClicked();
    expect(isMobileSpy).toHaveBeenCalled();
  });


  it('should emit onClose if trackUrls is false', async () => {
    const emitSpy = jest.spyOn(component.onClose, 'emit');
    component.trackUrls = false;

    await component.onBack();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not emit onClose if trackUrls is true', async () => {
    const emitSpy = jest.spyOn(component.onClose, 'emit');
    const routerSpy = jest.spyOn(router, 'navigate');
    component.trackUrls = true;

    await component.onBack();

    expect(emitSpy).not.toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });
});
