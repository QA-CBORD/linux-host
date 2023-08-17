import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController, PopoverController } from '@ionic/angular';
import { StHeaderComponent } from './st-header.component';
import { NativeProvider } from '@core/provider/native-provider/native.provider';
import { Storage } from '@ionic/storage';
import { MockStorageService } from '@core/states/storage/storage-state.service.mock';

const modalController = {
  create: jest.fn(),
};

const popoverCtrl = {};

const nativeProvider = {};

describe('StHeaderComponent', () => {
  let component: StHeaderComponent;
  let fixture: ComponentFixture<StHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StHeaderComponent],
      providers: [
        { provide: ModalController, useValue: modalController },
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: NativeProvider, useValue: nativeProvider },
        { provide: Storage , useClass: MockStorageService }
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
    component.onDissmissClicked();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
