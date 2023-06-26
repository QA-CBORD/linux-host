import { TestBed } from '@angular/core/testing';
import { RoomsStateService } from "./rooms-state.service";

describe("RoomsStateService", () => {
  let service: RoomsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomsStateService);
  });

  describe('Main', () => {
    it('Should exist', () => {
      expect(service).toBeTruthy();
    });
  });
});
