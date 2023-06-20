import { TestBed } from '@angular/core/testing';
import { CoordsService } from '@core/service/coords/coords.service';
import { CheckingService } from './check-in-service';
import { ContentStringsFacadeService } from '@core/facades/content-strings/content-strings.facade.service';
import { CheckingServiceFacade } from './check-in-facade.service';

describe('CheckingServiceFacade', () => {
  let service: CheckingServiceFacade;

  beforeEach(() => {
    const coordsServiceStub = () => ({
      getCoords: () => ({ pipe: () => ({}) })
    });
    const checkingServiceStub = () => ({ checkInOrder: object => ({}) });
    const contentStringsFacadeServiceStub = () => ({
      resolveContentString$: (patronUi, checkin, contentStringName) => ({
        pipe: () => ({})
      }),
      getContentString$: (patronUi, checkin, contentStringName) => ({
        pipe: () => ({})
      })
    });
    TestBed.configureTestingModule({
      providers: [
        CheckingServiceFacade,
        { provide: CoordsService, useFactory: coordsServiceStub },
        { provide: CheckingService, useFactory: checkingServiceStub },
        {
          provide: ContentStringsFacadeService,
          useFactory: contentStringsFacadeServiceStub
        }
      ]
    });
    service = TestBed.inject(CheckingServiceFacade);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
