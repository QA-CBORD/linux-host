import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AccessCardComponent } from "./access-card.component";
import { AccessCardService } from './services/access-card.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalController, PopoverController } from '@ionic/angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { MobileCredentialFacade } from '@shared/ui-components/mobile-credentials/service/mobile-credential-facade.service';
import { Storage } from '@ionic/storage';
import { MockStorageService } from '@core/states/storage/storage-state-mock.service';

describe("AccessCardComponent", () => {
  let component: AccessCardComponent;
  let fixture: ComponentFixture<AccessCardComponent>;
  let myService: AccessCardService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccessCardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: {} },
        { provide: PopoverController, useValue: {} },
        { provide: Storage , useClass: MockStorageService },
        MobileCredentialFacade,
        AndroidPermissions,
        AccessCardService

      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    myService = TestBed.inject(AccessCardService);
  });

  describe('method1', () => {
    it('should ...', () => {
      expect(component).toBeTruthy();
    });
  });
})