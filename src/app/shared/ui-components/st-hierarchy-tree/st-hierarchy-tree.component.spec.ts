import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StHierarcheTreeComponent } from './st-hierarchy-tree.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { WorkOrderStateService } from '../../../sections/housing/work-orders/work-order-state.service';

describe('StHierarcheTreeComponent', () => {
  let component: StHierarcheTreeComponent;
  let fixture: ComponentFixture<StHierarcheTreeComponent>;
  let mockModalCtrl: Partial<ModalController>;
  let mockWorkOrderStateService: Partial<WorkOrderStateService>;

  beforeEach(() => {
    mockModalCtrl = {
      create: jest.fn().mockImplementation(() => ({
        present: jest.fn(),
      })),
    };

    mockWorkOrderStateService = {
      getSelectedFacility$: jest.fn().mockReturnValue(of({ name: 'test' })),
      clearSelectedFacility: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [IonicModule],
      declarations: [StHierarcheTreeComponent],
      providers: [
        { provide: ModalController, useValue: mockModalCtrl },
        { provide: WorkOrderStateService, useValue: mockWorkOrderStateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StHierarcheTreeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit if selected facility name exists', () => {
    component.ngOnInit();
    expect(component.form.get('facilityName').value).toBe('test');
  });

  it('should unsubscribe and clear selected facility on ngOnDestroy', () => {
    component.ngOnDestroy();
    expect(mockWorkOrderStateService.clearSelectedFacility).toHaveBeenCalled();
  });

  it('should open modal on open', async () => {
    await component.open();
    expect(mockModalCtrl.create).toHaveBeenCalled();
  });

  it('should pass selectedItem.id to modal on open if selectedItem exists', async () => {
    component.selectedItem = { id: 1, name: 'test' };
    await component.open();
    expect(mockModalCtrl.create).toHaveBeenCalledWith(expect.objectContaining({
      componentProps: {
        selectedItemId: component.selectedItem.id,
        lookups: undefined,
        allowParent: true,
      },
    }));
  });
});