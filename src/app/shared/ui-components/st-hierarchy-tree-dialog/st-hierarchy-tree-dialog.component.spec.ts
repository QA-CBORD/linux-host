import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StHierarcheTreeDialogComponent } from './st-hierarchy-tree-dialog.component';
import { IonicModule, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { WorkOrderStateService } from '../../../sections/housing/work-orders/work-order-state.service';
import { LookUpItem, Slide, SlideItem } from '@sections/housing/work-orders/work-orders.model';
import Swiper from 'swiper';

describe('StHierarcheTreeDialogComponent', () => {
  let component: StHierarcheTreeDialogComponent;
  let fixture: ComponentFixture<StHierarcheTreeDialogComponent>;
  let mockLoadingController: Partial<LoadingController>;
  let mockModalController: Partial<ModalController>;
  let mockNavParams: Partial<NavParams>;
  let mockWorkOrderStateService: Partial<WorkOrderStateService>;

  beforeEach(async () => {
    mockLoadingController = {
      create: jest.fn().mockResolvedValue({ present: jest.fn() }),
      dismiss: jest.fn(),
    };

    mockModalController = {
      dismiss: jest.fn(),
    };

    mockNavParams = {
      get: jest.fn(),
    };

    mockWorkOrderStateService = {
      setSelectedFacilityTree: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [StHierarcheTreeDialogComponent],
      imports: [IonicModule],
      providers: [
        { provide: LoadingController, useValue: mockLoadingController },
        { provide: ModalController, useValue: mockModalController },
        { provide: NavParams, useValue: mockNavParams },
        { provide: WorkOrderStateService, useValue: mockWorkOrderStateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StHierarcheTreeDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create loading when ionViewDidLoad is called', async () => {
    await component.ionViewDidLoad();
    expect(mockLoadingController.create).toHaveBeenCalledWith({ message: 'please wait' });
  });

  it('should build initial slide correctly', () => {
    const lookups = [{ id: 1, name: 'Item 1', children: [] }];
    const slides = component.buildInitialSlide(lookups);
    expect(slides.length).toBe(1);
    expect(slides[0].items.length).toBe(1);
  });
  
  it('should add children correctly', () => {
    const parentSlide = { slideIndex: 0 } as Slide;
    const parentSlideItem = { nextSlideIndex: null } as SlideItem;
    const children = [{ id: 2, name: 'Child 1', children: [] }];
    component.slides = [{}, {}] as Slide[];
    component.addChildren(parentSlide, parentSlideItem, children);
    expect(component.slides.length).toBe(3);
  });

  it('should return false if selectedItemId is falsy', () => {
    component.selectedItemId = null;
    const lookUpItem = { id: 1, name: 'Item 1', children: [] };
    const result = component.isThisLookUpItemHasAnyDescendantSelected(lookUpItem);
    expect(result).toBe(false);
  });
  
  it('should return true if selectedItemId is truthy and descendant is found', () => {
    component.selectedItemId = 2;
    const mockLookUpItem = { id: 1, name: 'Item 1', children: [{ id: 2, name: 'Child 1', children: [] }] };
    const mockGetLookUpItemById = jest.spyOn(component, 'getLookUpItemById').mockReturnValueOnce(mockLookUpItem.children[0]);
    const result = component.isThisLookUpItemHasAnyDescendantSelected(mockLookUpItem);
    expect(mockGetLookUpItemById).toHaveBeenCalledWith(mockLookUpItem.children, component.selectedItemId);
    expect(result).toBe(true);
  });
  
  it('should return false if selectedItemId is truthy but descendant is not found', () => {
    component.selectedItemId = 2;
    const mockLookUpItem = { id: 1, name: 'Item 1', children: [{ id: 3, name: 'Child 1', children: [] }] };
    const mockGetLookUpItemById = jest.spyOn(component, 'getLookUpItemById').mockReturnValueOnce(null);
    const result = component.isThisLookUpItemHasAnyDescendantSelected(mockLookUpItem);
    expect(mockGetLookUpItemById).toHaveBeenCalledWith(mockLookUpItem.children, component.selectedItemId);
    expect(result).toBe(false);
  });
  
  it('should return the correct LookUpItem when found', () => {
    const selectedItemId = 2;
    const lookUps: LookUpItem[] = [
      { id: 1, name: 'Item 1', children: [] },
      { id: 2, name: 'Item 2', children: [] },
      { id: 3, name: 'Item 3', children: [] }
    ];
  
    const result = component.getLookUpItemById(lookUps, selectedItemId);
  
    expect(result).toEqual({ id: 2, name: 'Item 2', children: [] });
  });
  
  it('should return null if no LookUpItem is found', () => {
    const selectedItemId = 4;
    const lookUps: LookUpItem[] = [
      { id: 1, name: 'Item 1', children: [] },
      { id: 2, name: 'Item 2', children: [] },
      { id: 3, name: 'Item 3', children: [] }
    ];
  
    const result = component.getLookUpItemById(lookUps, selectedItemId);
  
    expect(result).toBeNull();
  });
  
  it('should return null if the provided array of LookUpItems is empty', () => {
    const selectedItemId = 2;
    const lookUps: LookUpItem[] = [];
  
    const result = component.getLookUpItemById(lookUps, selectedItemId);
  
    expect(result).toBeNull();
  });
  
  it('should return null if the provided array of LookUpItems is null or undefined', () => {
    const selectedItemId = 2;
    let lookUps: LookUpItem[] = null;
  
    let result = component.getLookUpItemById(lookUps, selectedItemId);
    expect(result).toBeNull();
  
    lookUps = undefined;
    result = component.getLookUpItemById(lookUps, selectedItemId);
    expect(result).toBeNull();
  });

  it('should call itemSelected with null', () => {
    const itemSelectedSpy = jest.spyOn(component, 'itemSelected');

    component.close();

    expect(itemSelectedSpy).toHaveBeenCalledWith(null);
  });

  it('should call itemSelected if item.nextSlideIndex is null', () => {
    const item: SlideItem = { id: 1, name: 'Item 1', parentId: null, lookUpItem: { children: []}, slide: {} as Slide, nextSlideIndex: null };
    const itemSelectedSpy = jest.spyOn(component, 'itemSelected');
    const slideToSpy = jest.spyOn(component, 'slideTo');

    component.handleItemClick(item);

    expect(itemSelectedSpy).toHaveBeenCalledWith(item);
    expect(slideToSpy).not.toHaveBeenCalled();
  });

  it('should call slideTo if item.nextSlideIndex is not null', () => {
    const item: SlideItem = { id: 1, name: 'Item 1', parentId: null, lookUpItem: {children: []}, slide: {} as Slide, nextSlideIndex: 1 };
    const itemSelectedSpy = jest.spyOn(component, 'itemSelected');
    const slideToSpy = jest.spyOn(component, 'slideTo');

    component.handleItemClick(item);

    expect(itemSelectedSpy).not.toHaveBeenCalled();
    expect(slideToSpy).toHaveBeenCalledWith(item);
  });

  it('should call setSelectedFacilityTree with item if item is truthy', () => {
    const item: SlideItem = { id: 1, name: 'Item 1', parentId: null, lookUpItem: {children: []}, slide: {} as Slide, nextSlideIndex: null };
    const setSelectedFacilityTreeSpy = jest.spyOn(component['_workOrderStateService'], 'setSelectedFacilityTree');
    const dismissSpy = jest.spyOn(component['viewCtrl'], 'dismiss');

    component.itemSelected(item);

    expect(setSelectedFacilityTreeSpy).toHaveBeenCalledWith(item);
    expect(dismissSpy).toHaveBeenCalledWith({ item });
  });

  it('should not call setSelectedFacilityTree if item is falsy', () => {
    const setSelectedFacilityTreeSpy = jest.spyOn(component['_workOrderStateService'], 'setSelectedFacilityTree');
    const dismissSpy = jest.spyOn(component['viewCtrl'], 'dismiss');

    component.itemSelected(null);

    expect(setSelectedFacilityTreeSpy).not.toHaveBeenCalled();
    expect(dismissSpy).toHaveBeenCalledWith({ item: null });
  });
  
  it('ionViewDidEnter should throw error if lookups is missing', () => {
    jest.spyOn(mockNavParams, 'get').mockReturnValue(null);

    expect(() => component.ionViewDidEnter()).toThrowError();
  });

  it('ionViewDidEnter should set properties and call methods if lookups is not missing', () => {
    const lookups = [{ id: 1, name: 'test', children: [] }];
    jest.spyOn(mockNavParams, 'get').mockImplementation((param) => {
      if (param === 'lookups') {
        return lookups;
      } else if (param === 'selectedItemId' || param === 'allowParent') {
        return null;
      }
    });
    const buildInitialSlideSpy = jest.spyOn(component, 'buildInitialSlide').mockReturnValue([]);
    const setCanSwipeSpy = jest.spyOn(component, 'setCanSwipe');
  
    // Mock swiperSlides
    component.swiperSlides = {
      allowSlideNext: true,
      allowSlidePrev: true,
      allowTouchMove: true,
    } as Swiper;
  
    component.ionViewDidEnter();
  
    expect(component.lookups).toEqual(lookups);
    expect(buildInitialSlideSpy).toHaveBeenCalledWith(lookups);
    expect(setCanSwipeSpy).toHaveBeenCalledWith(false);
    expect(component.swiperSlides.allowTouchMove).toBe(false);
  });

  it('setSwiperInstance should set swiperSlides', () => {
    const mockSwiper = {
      allowSlideNext: true,
      allowSlidePrev: true,
      allowTouchMove: true,
    } as Swiper;
  
    component.setSwiperInstance(mockSwiper);
  
    expect(component.swiperSlides).toEqual(mockSwiper);
  });

  it('slideTo should throw error if itemOrIndex is null', () => {
    expect(() => component.slideTo(null)).toThrowError();
  });
  
  it('slideTo should throw error if itemOrIndex.nextSlideIndex is null', () => {
    const itemOrIndex = {
      id: 1,
      nextSlideIndex: null,
    } as SlideItem;
  
    expect(() => component.slideTo(itemOrIndex)).toThrowError();
  });
  
  it('slideTo should call addChildren and set nextSlideIndex if itemOrIndex.nextSlideIndex is undefined', () => {
    const itemOrIndex = {
      id: 1,
      nextSlideIndex: undefined,
      slide: {},
      lookUpItem: {
        children: [],
      },
    } as SlideItem;
    const addChildrenSpy = jest.spyOn(component, 'addChildren');
    const setCanSwipeSpy = jest.spyOn(component, 'setCanSwipe');
  
    // Mock swiperSlides
    component.swiperSlides = {
      slideTo: jest.fn(),
    } as any;
  
    const slideToSpy = jest.spyOn(component.swiperSlides, 'slideTo');
  
    jest.useFakeTimers();
  
    component.slideTo(itemOrIndex);
  
    jest.runAllTimers();
  
    expect(addChildrenSpy).toHaveBeenCalledWith(itemOrIndex.slide, itemOrIndex, itemOrIndex.lookUpItem.children);
    expect(setCanSwipeSpy).toHaveBeenCalledWith(true);
    expect(slideToSpy).toHaveBeenCalledWith(itemOrIndex.nextSlideIndex);
    expect(setCanSwipeSpy).toHaveBeenCalledWith(false);
  });
  
  it('slideTo should set nextSlideIndex to itemOrIndex if itemOrIndex is a number', () => {
    const itemOrIndex = 1;
    const setCanSwipeSpy = jest.spyOn(component, 'setCanSwipe');
  
    // Mock swiperSlides
    component.swiperSlides = {
      slideTo: jest.fn(),
    } as any;
  
    const slideToSpy = jest.spyOn(component.swiperSlides, 'slideTo');
  
    jest.useFakeTimers();
  
    component.slideTo(itemOrIndex);
  
    jest.runAllTimers();
  
    expect(setCanSwipeSpy).toHaveBeenCalledWith(true);
    expect(slideToSpy).toHaveBeenCalledWith(itemOrIndex);
    expect(setCanSwipeSpy).toHaveBeenCalledWith(false);
  });

  it('buildSlides should set nextSlideIndex to undefined if lookUpItem has children', () => {
    const lookUpItem = {
      id: 1,
      name: 'test',
      children: [{}],
    };
    const _topParentSlide = {};
  
    const result = component['buildSlides'](lookUpItem, _topParentSlide);
  
    expect(result.nextSlideIndex).toBeUndefined();
  });

  it('buildSlides should return SlideItem with id and name from lookUpItem if they exist', () => {
    const lookUpItem = {
      id: 1,
      name: 'test',
      children: [],
    };
    const _topParentSlide = {};
  
    const result = component['buildSlides'](lookUpItem, _topParentSlide);
  
    expect(result).toEqual({
      id: lookUpItem.id,
      name: lookUpItem.name,
      parentId: null,
      lookUpItem,
      slide: _topParentSlide,
      nextSlideIndex: null,
    });
  });
  
  it('buildSlides should return SlideItem with id and name from facilityKey and facilityFullName if id and name do not exist', () => {
    const lookUpItem = {
      facilityKey: 1,
      facilityFullName: 'test',
      children: [],
    };
    const _topParentSlide = {};
  
    const result = component['buildSlides'](lookUpItem, _topParentSlide);
  
    expect(result).toEqual({
      id: lookUpItem.facilityKey,
      name: lookUpItem.facilityFullName,
      parentId: null,
      lookUpItem,
      slide: _topParentSlide,
      nextSlideIndex: null,
    });
  });

  it('isSlideValid should return false if slideItemSelected is true', () => {
    const slideItemSelected = true;
    const _parentSlideItem = { id: 1 };
    const lookUpItem = {};
  
    const result = component['isSlideValid'](slideItemSelected, _parentSlideItem, lookUpItem);
  
    expect(result).toBe(false);
  });

  it('isSlideValid should return false if selectedItemId is falsy', () => {
    const slideItemSelected = false;
    const _parentSlideItem = { id: 1 };
    const lookUpItem = {};
  
    const result = component['isSlideValid'](slideItemSelected, _parentSlideItem, lookUpItem);
  
    expect(result).toBe(null);
  });

  it('isSlideValid should return false if selectedItemId does not match _parentSlideItem.id', () => {
    const slideItemSelected = false;
    const _parentSlideItem = { id: 1 };
    const lookUpItem = {};
    component.selectedItemId = 2;
  
    const result = component['isSlideValid'](slideItemSelected, _parentSlideItem, lookUpItem);
  
    expect(result).toBe(false);
  });
});