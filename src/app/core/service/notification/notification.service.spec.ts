import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService],
    });
    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a reset password notification', () => {
    const institutionId = 'test-institution';
    const userName = 'test-user';
    const sessionId = 'test-session';

    service.resetPasswordNotification(institutionId, userName, sessionId).subscribe(response => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne('/json/notification');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.method).toBe('resetPasswordNotification');
    expect(req.request.body.params.institutionId).toBe(institutionId);
    expect(req.request.body.params.userName).toBe(userName);
    expect(req.request.body.params.sessionId).toBe(sessionId);

    req.flush({ response: true });
  });
});
