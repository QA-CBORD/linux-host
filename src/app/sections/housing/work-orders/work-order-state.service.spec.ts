import { BehaviorSubject } from 'rxjs';
import { WorkOrderStateService } from './work-order-state.service';
import { WorkOrder, WorkOrderDetails, FormDefinition, NamedIdentity } from './work-orders.model';
import { ImageData } from './work-orders.model';
describe('WorkOrderStateService', () => {
  let service: WorkOrderStateService;

  beforeEach(() => {
    // Initialize the service
    service = new WorkOrderStateService();
  });

  describe('setWorkOrder', () => {
    it('should set the work order BehaviorSubject value', () => {
      const workOrder: WorkOrder = {
        canSubmit: false,
        workOrders: []
      }; // Provide appropriate mock values

      service.setWorkOrder(workOrder);

      expect(service.workOrder.getValue()).toBe(workOrder);
    });
  });

  describe('setWorkOrderDetails', () => {
    it('should set the work order details BehaviorSubject value', () => {
      const workOrderDetails: WorkOrderDetails = {
        workOrderKey: 0,
        workOrderDetails: undefined,
        formDefinition: undefined,
        workOrderTypes: [],
        facilityTree: []
      }; // Provide appropriate mock values

      service.setWorkOrderDetails(workOrderDetails);

      expect(service.workOrderDetails.getValue()).toBe(workOrderDetails);
    });
  });

  describe('setWorkOrderFormDetails', () => {
    it('should set the work order form details BehaviorSubject value', () => {
      const workOrderFormDetails: FormDefinition = {
        id: 0,
        applicationDescription: '',
        applicationFormJson: '',
        applicationTitle: '',
        applicationTypeId: 0,
        applicationAvailableEndDateTime: '',
        applicationAvailableStartDateTime: '',
        cancellationDateTime: '',
        expirationDateTime: '',
        expireWhenAssigned: 0,
        numberOfDaysToExpire: 0,
        termId: 0
      }; // Provide appropriate mock values

      service.setWorkOrderFormDetails(workOrderFormDetails);

      expect(service.workOrderFormDetails.getValue()).toBe(workOrderFormDetails);
    });
  });

  describe('setWorkOrderImage', () => {
    it('should set the work order image BehaviorSubject value', () => {
      const imageData: ImageData = {
        comments: '',
        contents: '',
        filename: '',
        studentSubmitted: false,
        workOrderKey: 0
      }; // Provide appropriate mock values

      service.setWorkOrderImage(imageData);

      expect(service.workOrderImage.getValue()).toBe(imageData);
    });
  });

  describe('setSelectedFacilityTree', () => {
    it('should set the selected facility BehaviorSubject value', () => {
      const selectedFacility: NamedIdentity = {}; // Provide appropriate mock values

      service.setSelectedFacilityTree(selectedFacility);

      expect(service.selectedFacility$.getValue()).toBe(selectedFacility);
    });
  });

  describe('destroyWorkOrderImage', () => {
    it('should set the work order image BehaviorSubject value to null', () => {
      service.destroyWorkOrderImage();

      expect(service.workOrderImage.getValue()).toBe(null);
    });
  });

  describe('getSelectedFacility$', () => {
    it('should return the selected facility BehaviorSubject', (done) => {
      const selectedFacility: NamedIdentity = {}; // Provide appropriate mock values
      service.setSelectedFacilityTree(selectedFacility);

      service.getSelectedFacility$().subscribe((result) => {
        expect(result).toBe(selectedFacility);
        done();
      });
    });
  });

  describe('clearSelectedFacility', () => {
    it('should set the selected facility BehaviorSubject value to null', () => {
      service.clearSelectedFacility();

      expect(service.selectedFacility$.getValue()).toBe(null);
    });
  });

  describe('setWorkOrderImageBlob', () => {
    it('should set the work order image blob BehaviorSubject value', () => {
      const formData: FormData = {
        append: function (name: string, value: string | Blob, fileName?: string): void {
          throw new Error('Function not implemented.');
        },
        delete: function (name: string): void {
          throw new Error('Function not implemented.');
        },
        get: function (name: string): FormDataEntryValue {
          throw new Error('Function not implemented.');
        },
        getAll: function (name: string): FormDataEntryValue[] {
          throw new Error('Function not implemented.');
        },
        has: function (name: string): boolean {
          throw new Error('Function not implemented.');
        },
        set: function (name: string, value: string | Blob, fileName?: string): void {
          throw new Error('Function not implemented.');
        },
        forEach: function (callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void {
          throw new Error('Function not implemented.');
        }
      } as FormData; // Provide appropriate mock values

      service.setWorkOrderImageBlob(formData);

      expect(service.workOrderImageBlob.getValue()).toBe(formData);
    });
  });

  describe('destroyWorkOrderImageBlob', () => {
    it('should set the work order image blob BehaviorSubject value to null', () => {
      service.destroyWorkOrderImageBlob();

      expect(service.workOrderImageBlob.getValue()).toBe(null);
    });
  });

  describe('workOrderImage$', () => {
    it('should return the work order image BehaviorSubject', (done) => {
      const imageData: ImageData = {
        comments: '',
        contents: '',
        filename: '',
        studentSubmitted: false,
        workOrderKey: 0
      }; // Provide appropriate mock values
      service.setWorkOrderImage(imageData);

      service.workOrderImage$.subscribe((result) => {
        expect(result).toBe(imageData);
        done();
      });
    });
  });

  describe('workOrder$', () => {
    it('should return the work order BehaviorSubject', (done) => {
      const workOrder: WorkOrder = {
        canSubmit: false,
        workOrders: []
      }; // Provide appropriate mock values
      service.setWorkOrder(workOrder);

      service.workOrder$.subscribe((result) => {
        expect(result).toBe(workOrder);
        done();
      });
    });
  });

  describe('WorkOrderImageBlob', () => {
    it('should return the work order image blob BehaviorSubject', (done) => {
      const formData: FormData = {
        append: function (name: string, value: string | Blob, fileName?: string): void {
          throw new Error('Function not implemented.');
        },
        delete: function (name: string): void {
          throw new Error('Function not implemented.');
        },
        get: function (name: string): FormDataEntryValue {
          throw new Error('Function not implemented.');
        },
        getAll: function (name: string): FormDataEntryValue[] {
          throw new Error('Function not implemented.');
        },
        has: function (name: string): boolean {
          throw new Error('Function not implemented.');
        },
        set: function (name: string, value: string | Blob, fileName?: string): void {
          throw new Error('Function not implemented.');
        },
        forEach: function (callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void {
          throw new Error('Function not implemented.');
        }
      } as FormData; // Provide appropriate mock values
      service.setWorkOrderImageBlob(formData);

      service.WorkOrderImageBlob.subscribe((result) => {
        expect(result).toBe(formData);
        done();
      });
    });
  });
});
