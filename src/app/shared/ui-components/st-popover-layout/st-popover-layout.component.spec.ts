import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverController } from '@ionic/angular';
import { StPopoverLayoutComponent } from './st-popover-layout.component';
import { BUTTON_TYPE } from '../../../core/utils/buttons.config';
import { PopoverConfig } from '@core/model/popover/popover.model';

describe('StPopoverLayoutComponent', () => {
  let component: StPopoverLayoutComponent;
  let fixture: ComponentFixture<StPopoverLayoutComponent>;
  let mockPopoverController = { dismiss: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StPopoverLayoutComponent ],
      providers: [
        { provide: PopoverController, useValue: mockPopoverController }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StPopoverLayoutComponent);
    component = fixture.componentInstance;
    component.popoverConfig = { title: 'Test Title' } as PopoverConfig<string | number>;
    fixture.detectChanges();
  });

  it('should call popoverCtrl.dismiss with correct arguments when closeModal is called', async () => {
    await component.closeModal('CANCEL', BUTTON_TYPE.CANCEL);
    expect(mockPopoverController.dismiss).toHaveBeenCalledWith('CANCEL', BUTTON_TYPE.CANCEL);

    await component.closeModal('OKAY', BUTTON_TYPE.OKAY);
    expect(mockPopoverController.dismiss).toHaveBeenCalledWith('OKAY', BUTTON_TYPE.OKAY);

    await component.closeModal();
    expect(mockPopoverController.dismiss).toHaveBeenCalledWith('CANCEL', BUTTON_TYPE.CANCEL);
  });
});