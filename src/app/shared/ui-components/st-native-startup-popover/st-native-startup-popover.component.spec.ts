import { PopupButton } from '@core/model/button';
import { StPopoverComponentDataModel } from '@shared/model/st-popover-data.model';
import { StNativeStartupPopoverComponent } from './st-native-startup-popover.component';

describe('StNativeStartupPopoverComponent', () => {
  let component: StNativeStartupPopoverComponent;
  
  beforeEach(() => {
    component = new StNativeStartupPopoverComponent();
  });

  it('should initialize popoverConfig correctly', () => {
    const mockData: StPopoverComponentDataModel = {
      showClose: true,
      message: 'Test message',
      title: 'Test title',
      buttons: [
        { label: 'Button 1', type: 'cancel' },
        { label: 'Button 2', type: 'confirm' },
      ] as PopupButton[],
    };

    component.data = mockData;
    component.ngOnInit();

    expect(component.popoverConfig).toEqual({
      title: mockData.title,
      message: mockData.message,
      buttons: mockData.buttons,
    });
  });
});
