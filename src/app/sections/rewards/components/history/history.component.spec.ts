import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RewardsService } from '../../services';
import { HistoryComponent } from './history.component';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(() => {
    const rewardsServiceStub = () => ({
      getHistoryListRewards: () => ({}),
      getContentValueByName: emptyHistoryListMessage => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [HistoryComponent],
      providers: [{ provide: RewardsService, useFactory: rewardsServiceStub }]
    });
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const rewardsServiceStub: RewardsService = fixture.debugElement.injector.get(
        RewardsService
      );
     jest.spyOn(rewardsServiceStub, 'getHistoryListRewards');
      component.ngOnInit();
      expect(rewardsServiceStub.getHistoryListRewards).toHaveBeenCalled();
    });
  });
});
