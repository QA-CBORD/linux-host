import { TestBed } from '@angular/core/testing';
import { RoomsService } from "./rooms.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalController, PopoverController } from '@ionic/angular';
import { popoverCtrl } from '../pages/form-payment/form-payment.component.spec';
import { EnvironmentType } from '@core/model/environment';
import { EnvironmentFacadeService } from '@core/facades/environment/environment.facade.service';
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
describe("RoomsService", () => {
  let service: RoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ModalController, useValue: modalController },
      { provide: PopoverController, useValue: popoverCtrl },
      { provide: EnvironmentFacadeService, useValue: _environmentFacadeService }

      ]
    });
    service = TestBed.inject(RoomsService);
  });

  describe('Main', () => {
    it('Should exist', () => {
      expect(service).toBeTruthy();
    });
  });
});
