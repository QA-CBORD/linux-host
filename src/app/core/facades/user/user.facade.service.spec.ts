import { TestBed } from '@angular/core/testing';
import { UserFacadeService } from './user.facade.service';


describe('User.FacadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserFacadeService = TestBed.get(UserFacadeService);
    expect(service).toBeTruthy();
  });
});
