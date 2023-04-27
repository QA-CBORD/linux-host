import { ModalControllerMock } from 'src/app/testing/mock-services/modal-controller.service';
import { ModalsService } from './modals.service';
import { GlobalNavServiceMock } from 'src/app/testing/mock-services/global-nav-service.mock';

describe('ModalsService', () => {
  let modalsService: any;
  let modalController: any;
  let globalNavService: any;
  let modalElement: any;
  let bindModalListenersSpy;
  let eventCallbacks: Map<string, () => void>;

  beforeEach(() => {
    modalController = Object.create(ModalControllerMock);
    globalNavService = Object.create(GlobalNavServiceMock);
    modalsService = new ModalsService(modalController, globalNavService);
    bindModalListenersSpy = jest.spyOn(modalsService, 'bindModalListeners');
    eventCallbacks = new Map<string, () => void>();

    modalElement = {
      addEventListener: jest.fn((event, callback) => {
        eventCallbacks.set(event, callback);
      }),
      onWillDismiss: jest.fn().mockResolvedValue(null),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a modal', async () => {
    const modalOptions = { component: 'MyModalComponent' };
    modalController.create.mockResolvedValue(modalElement);

    const result = await modalsService.create(modalOptions);

    expect(modalController.create).toHaveBeenCalledWith({
      handle: false,
      backdropDismiss: false,
      cssClass: 'sc-modal',
      ...modalOptions,
    });
    expect(bindModalListenersSpy).toHaveBeenCalledWith(modalElement, undefined);
    expect(result).toBe(modalElement);
  });

  it('should create an alert modal', async () => {
    const modalOptions = { component: 'MyModalComponent' };
    modalController.create.mockResolvedValue(modalElement);

    const result = await modalsService.createAlert(modalOptions);

    expect(modalController.create).toHaveBeenCalledWith({
      handle: false,
      backdropDismiss: false,
      cssClass: 'sc-modal sc-modal-alert',
      ...modalOptions,
    });
    expect(bindModalListenersSpy).toHaveBeenCalledWith(modalElement, undefined);
    expect(result).toBe(modalElement);
  });

  it('should create an action sheet modal', async () => {
    const modalOptions = { component: 'MyModalComponent' };
    modalController.create.mockResolvedValue(modalElement);

    const result = await modalsService.createActionSheet(modalOptions);

    expect(modalController.create).toHaveBeenCalledWith({
      handle: false,
      breakpoints: [1],
      initialBreakpoint: 1,
      ...modalOptions,
    });
    expect(bindModalListenersSpy).toHaveBeenCalledWith(modalElement, undefined);
    expect(result).toBe(modalElement);
  });

  it('should dismiss a modal', async () => {
    const data = { foo: 'bar' };
    const role = 'cancel';
    const id = 'myModal';
    modalController.dismiss.mockResolvedValue(true);

    const result = await modalsService.dismiss(data, role, id);

    expect(modalController.dismiss).toHaveBeenCalledWith(data, role, id);
    expect(result).toBe(true);
  });

  it('should dismiss a modal', async () => {
    const data = { foo: 'bar' };
    const role = 'cancel';
    const id = 'myModal';
    modalController.dismiss.mockResolvedValue(true);

    const result = await modalsService.dismiss(data, role, id);

    expect(modalController.dismiss).toHaveBeenCalledWith(data, role, id);
    expect(result).toBe(true);
  });

  it('should call notifyBackdropShown and hideNavBar on ionModalWillPresent', () => {
    const handleNavBarState = true;

    modalsService.bindModalListeners(modalElement, handleNavBarState);
    eventCallbacks.get('ionModalWillPresent')();

    expect(globalNavService.notifyBackdropShown).toHaveBeenCalled();
    expect(globalNavService.hideNavBar).toHaveBeenCalled();
  });

  it('should call document.getElementById and notifyBackdropHidden on ionModalDidPresent', () => {
    const handleNavBarState = true;
    const focusMock = jest.fn();
    global.document.getElementById = jest.fn().mockReturnValue({ focus: focusMock });

    modalsService.bindModalListeners(modalElement, handleNavBarState);
    eventCallbacks.get('ionModalDidPresent')();

    expect(global.document.getElementById).toHaveBeenCalledWith('modal-mainTitle');
    expect(focusMock).toHaveBeenCalled();
  });

  it('should call showNavBar on ionModalDidDismiss', async () => {
    const handleNavBarState = true;
    const promiseMock = Promise.resolve();
    modalElement.onWillDismiss = jest.fn().mockReturnValue(promiseMock);

    modalsService.bindModalListeners(modalElement, handleNavBarState);
    eventCallbacks.get('ionModalDidDismiss')();

    await promiseMock;
    expect(globalNavService.showNavBar).toHaveBeenCalled();
  });
});
