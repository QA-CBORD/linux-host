import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchFilterModalComponent } from "./search-filter-modal.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalController, PopoverController } from '@ionic/angular';
import { popoverCtrl } from '@sections/housing/pages/form-payment/form-payment.component.spec';
import { EnvironmentType } from '@core/model/environment';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
import { Storage } from '@ionic/storage';
const _environmentFacadeService = {
  getHousingAPIURL: jest.fn(),
  getEnvironmentObject: jest.fn(() => ({
    environment: EnvironmentType.develop,
    services_url: 'https://services.get.dev.cbord.com/GETServices/services',
    site_url: 'https://get.dev.cbord.com',
    secmsg_api: 'https://secmsg.api.dev.cbord.com',
    image_url: 'https://3bulchr7pb.execute-api.us-east-1.amazonaws.com/dev/image/',
    housing_aws_url: 'https://5yu7v7hrq2.execute-api.us-east-1.amazonaws.com/dev',
    partner_services_url: 'https://ft45xg91ch.execute-api.us-east-1.amazonaws.com/dev',
  })),
};
const modalController = {
  create: jest.fn()
}
const _storage = {
  clear: jest.fn(),
  ready: jest.fn(),
  get: jest.fn(),
};
describe("SearchFilterModalComponent", () => {
  let component: SearchFilterModalComponent;
  let fixture: ComponentFixture<SearchFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFilterModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ModalController, useValue: modalController },
        { provide: PopoverController, useValue: popoverCtrl },
        { provide: EnvironmentFacadeService, useValue: _environmentFacadeService },
        { provide: Storage, useValue: _storage },

      ],

      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  describe('Main', () => {
    it('Should exist', () => {
      expect(component).toBeTruthy();
    });
  });
})