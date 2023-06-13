import { TestBed } from "@angular/core/testing";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { HousingProxyService } from "../housing-proxy.service";
import { WaitingListStateService } from "./waiting-list-state.service";
import { QuestionsService } from "../questions/questions.service";
import { WaitingListsService } from "./waiting-lists.service";

describe("WaitingListsService", () => {
  let service: WaitingListsService;

  beforeEach(() => {
    const environmentFacadeServiceStub = () => ({});
    const housingProxyServiceStub = () => ({
      post: (arg, body) => ({ pipe: () => ({}) })
    });
    const waitingListStateServiceStub = () => ({
      waitingListDetails$: { pipe: () => ({}) },
      setFormSelection: formValue => ({}),
      formSelection$: { subscribe: f => f({}) }
    });
    const questionsServiceStub = () => ({
      toFormGroup: (questions, storedQuestions, function0) => ({}),
      getQuestions: applicationFormJson => ({ map: () => ({}) }),
      splitByPages: arg => ({}),
      getAttributeValue: (question, patronAttributes) => ({}),
      getRequiredValidator: question => ({})
    });
    TestBed.configureTestingModule({
      providers: [
        WaitingListsService,
        {
          provide: EnvironmentFacadeService,
          useFactory: environmentFacadeServiceStub
        },
        { provide: HousingProxyService, useFactory: housingProxyServiceStub },
        {
          provide: WaitingListStateService,
          useFactory: waitingListStateServiceStub
        },
        { provide: QuestionsService, useFactory: questionsServiceStub }
      ]
    });
    service = TestBed.inject(WaitingListsService);
  });

  it("can load instance", () => {
    expect(service).toBeTruthy();
  });
});
