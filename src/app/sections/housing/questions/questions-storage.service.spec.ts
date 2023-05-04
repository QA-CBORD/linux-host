import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { first, map, of, switchMap, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ApplicationStatus } from '../applications/applications.model';
import { QuestionsStorageService } from './questions-storage.service';

const _storage = {
  clear: jest.fn(),
  ready: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
};
describe('QuestionsStorageService', () => {
  let service: QuestionsStorageService;
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Storage,
          useValue: _storage,
        },
      ],
    });
    service = TestBed.inject(QuestionsStorageService);
  });
  describe('getApplicationStatus', () => {
    it('should emit the stored application status when it exists', () => {
      const mockStoredApplication = { status: 5, questions: [], createdDateTime: '' };
      jest.spyOn(service, 'getApplication').mockReturnValue(of(mockStoredApplication));
      const mockKey = 1234;

      service.getApplicationStatus(mockKey).subscribe(applicationStatus => {
        expect(applicationStatus).toEqual(5);
      });
    });

    it('should return null when the stored application status is null', () => {
      jest.spyOn(service, 'getApplication').mockReturnValue(of(null));
      const mockKey = 5678;

      service.getApplicationStatus(mockKey).subscribe(applicationStatus => {
        expect(applicationStatus).toBeNull();
      });
    });
  });
  describe('removeApplication', () => {
    let mockObservableStorage;

    beforeEach(() => {
      mockObservableStorage = {
        remove: jest.fn().mockReturnValue(of('mock-value')),
      };
    });

    it('should emit a value when the observableStorage.remove method succeeds', () => {
      const mockKey = 1234;

      service.removeApplication(mockKey).subscribe(result => {
        expect(result).toEqual('mock-value');
      });
    });

    it('should throw an error when the observableStorage.remove method fails', () => {
      const mockKey = 5678;
      const mockError = new Error('mock error');
      jest.spyOn(mockObservableStorage, 'remove').mockReturnValue(throwError(mockError));

      service.removeApplication(mockKey).subscribe(
        () => {},
        error => {
          expect(error).toEqual(mockError);
        }
      );
    });
  });
  describe('getQuestions', () => {
    let mockGetApplication: jest.Mock;

    beforeEach(() => {
      mockGetApplication = jest.fn();
    });

    it('should return questions when storedForm exists', () => {
      const key = 1;
      const storedForm = {
        questions: [
          { id: 1, text: 'Question 1' },
          { id: 2, text: 'Question 2' },
        ],
      };

      mockGetApplication.mockReturnValueOnce(of(storedForm));

      service.getQuestions(key).subscribe(questions => {
        expect(questions).toEqual(storedForm.questions);
      });
    });

    it('should return null when storedForm is null', () => {
      const key = 1;
      const storedForm = null;

      mockGetApplication.mockReturnValueOnce(of(storedForm));

      service.getQuestions(key).subscribe(questions => {
        expect(questions).toBeNull();
      });
    });
  });
  describe('updateCreatedDateTime()', () => {
    let scheduler: TestScheduler;

    beforeEach(() => {
      scheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
    });

    it('should return the existing createdDateTime if it exists', () => {
      const storedForm = { createdDateTime: '2022-01-01T00:00:00.000Z' };
      const key = 123;

      scheduler.run(async ({ cold }) => {
        const input$ = cold('a', { a: storedForm });
        service.updateCreatedDateTime(key, '2023-01-01T00:00:00.000Z').pipe(
          switchMap(() => input$),
          map(res => {
            expect(res.createdDateTime).toBe('2022-01-01T00:00:00.000Z');
          }),
          first()
        );
      });
    });

    it('should update and return the createdDateTime if it does not exist', () => {
      const storedForm = null;
      const key = 123;

      scheduler.run(({ cold }) => {
        const input$ = cold('a', { a: storedForm });
        const output$ = service.updateCreatedDateTime(key, '2023-01-01T00:00:00.000Z').pipe(
          switchMap(() => input$),
          map(res => {
            expect(res.createdDateTime).toBe('2023-01-01T00:00:00.000Z');
          }),
          first()
        );
      });
    });

    it('should update and return the createdDateTime if it exists but is falsy', () => {
      const storedForm = { createdDateTime: null };
      const key = 123;

      scheduler.run(({ cold, expectObservable }) => {
        const input$ = cold('a', { a: storedForm });
        const output$ = service.updateCreatedDateTime(key, '2023-01-01T00:00:00.000Z').pipe(
          switchMap(() => input$),
          map(res => {
            expect(res.createdDateTime).toBe('2023-01-01T00:00:00.000Z');
          }),
          first()
        );
      });
    });
  });

  describe('updateQuestions', () => {
    it('should update questions and return an Observable', () => {
      const key = 123;
      const formValue = { question1: 'Answer 1', question2: 'Answer 2' };
      const status = 1;
      const storedForm = { questions: { question3: 'Answer 3' }, status: ApplicationStatus.New, createdDateTime: '' };
      const expected = { status, questions: formValue };

      const getApplicationSpy = jest.spyOn(service, 'getApplication').mockReturnValue(of(storedForm));
      const setSpy = jest.spyOn(_storage, 'set').mockReturnValue(of(null));

      service.updateQuestions(key, formValue, status).subscribe(() => {
        expect(getApplicationSpy).toHaveBeenCalledWith(key);
        expect(setSpy).toHaveBeenCalledWith(`${service.key}-${key}`, expected);
      });
    });
  });
});
