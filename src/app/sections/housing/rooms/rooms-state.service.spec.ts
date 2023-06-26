import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
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
=======
import { RoomsStateService } from './rooms-state.service';

describe('RoomsStateService', () => {
  let service: RoomsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [RoomsStateService] });
    service = TestBed.inject(RoomsStateService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
>>>>>>> ad1bfa6366250a3146a14063a8a61a1408f31dab
  });
});
