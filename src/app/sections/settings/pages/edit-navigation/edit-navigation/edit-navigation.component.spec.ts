import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNavigationComponent } from './edit-navigation.component';
import { NavigationFacadeSettingsService } from '@shared/ui-components/st-global-navigation/services/navigation-facade-settings.service';
import { of } from 'rxjs';
import { ItemReorderEventDetail } from '@ionic/angular';

describe('EditNavigationComponent', () => {
  let component: EditNavigationComponent;
  let fixture: ComponentFixture<EditNavigationComponent>;
  let navigationFacadeSettingsService = {
    initSettings: jest.fn().mockReturnValue(of([])),
    updateConfigState: jest.fn(),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNavigationComponent],
      providers: [
        {
          provide: NavigationFacadeSettingsService,
          useValue: navigationFacadeSettingsService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle reorder', async () => {
    const mockEventDetail: ItemReorderEventDetail = {
      from: 1,
      to: 3,
      complete: jest.fn(),
    };
    const mockEvent: CustomEvent<ItemReorderEventDetail> = new CustomEvent('reorder', {
      detail: mockEventDetail,
    });

    component.navElements = [{ id: 'item1' }, { id: 'item2' }, { id: 'item3' }, { id: 'item4' }] as any;
    await component.handleReorder(mockEvent);

    expect(component.navElements).toEqual([{ id: 'item1' }, { id: 'item3' }, { id: 'item4' }, { id: 'item2' }]);
    expect(mockEventDetail.complete).toHaveBeenCalledWith(false);
  });
});
