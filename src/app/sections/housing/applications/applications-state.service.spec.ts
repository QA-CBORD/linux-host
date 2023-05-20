import { TestBed } from '@angular/core/testing';
import { ApplicationsStateService } from "./applications-state.service";

describe("ApplicationsStateService", () => {
  let service: ApplicationsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationsStateService);
  });

  describe('method1', () => {
    it('should ...', () => {
      expect(service).toBeTruthy();
    });
  });
});
