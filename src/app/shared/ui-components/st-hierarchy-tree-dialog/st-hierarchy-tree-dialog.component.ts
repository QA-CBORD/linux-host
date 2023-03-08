import { Component, ViewEncapsulation } from '@angular/core';
import { LoadingController, ModalController, NavParams, IonicSlides } from '@ionic/angular';
import { SlideItem, LookUpItem, Slide } from '../../../sections/housing/work-orders/work-orders.model';
import { WorkOrderStateService } from '../../../sections/housing/work-orders/work-order-state.service';
import SwiperCore, { Pagination, Swiper } from 'swiper';
SwiperCore.use([Pagination, IonicSlides]);
@Component({
  selector: 'st-hierarchy-tree-dialog',
  templateUrl: './st-hierarchy-tree-dialog.component.html',
  styleUrls: ['./st-hierarchy-tree-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StHierarcheTreeDialogComponent {
  public slides: Slide[] = [];
  public swiperSlides: Swiper;

  public selectedItemId: number;
  public lookups: LookUpItem[];
  public allowParent: boolean;
  slideOpts = {
    initialSlide: 0,
    spaceBetween: 0,
    speed: 400,
    width: 350,
    autoHeight: true,
    slidesPerView: 1.01,
  };
  itemsPerSlide = 4;
  isLoading = true;
  pager = false;

  constructor(
    public loading: LoadingController,
    private params: NavParams,
    private viewCtrl: ModalController,
    private readonly _workOrderStateService: WorkOrderStateService
  ) {
    this.selectedItemId = null;
    this.lookups = null;
    this.allowParent = null;
  }
  public async ionViewDidLoad() {
    // Need to show a progress UI since it might take 1-2 secs to init the dialog if the lookups contains many items
    const load = await this.loading.create({
      message: 'please wait',
    });
    load.present();
  }

  // checking if user is allowed to see this page. Runs when the page has fully entered and is now the active page. This event will fire, whether it was the first load or a cached page.
  public ionViewDidEnter() {
    const _selectedItemId = this.params.get('selectedItemId');
    this.selectedItemId = _selectedItemId;

    const lookups = this.params.get('lookups');
    if (lookups) {
      this.lookups = lookups;
    } else {
      this.loading.dismiss();
      throw new Error(`MultiLevelSelectDialogComponent: lookups is missing; lookups: ${JSON.stringify(lookups)}`);
    }

    const allowParent = this.params.get('allowParent');
    this.allowParent = allowParent;

    this.slides = this.buildInitialSlide(this.lookups);
    this.setCanSwipe(false);

    this.swiperSlides.allowTouchMove = false;

    // dismiss the progress UI when the dialog UI is initialized
    // this.loading.dismiss();
  }

  private buildSlides(lookUpItem, _topParentSlide): SlideItem {
    return {
      id: lookUpItem.id ? lookUpItem.id : lookUpItem.facilityKey,
      name: lookUpItem.name ? lookUpItem.name : lookUpItem.facilityFullName,
      parentId: null,
      lookUpItem,
      slide: _topParentSlide,
      nextSlideIndex: lookUpItem.children.length > 0 ? undefined : null,
    };
  }

  private isSlideValid(slideItemSelected, _parentSlideItem, lookUpItem) {
    return (
      !slideItemSelected &&
      this.selectedItemId &&
      (_parentSlideItem.id === this.selectedItemId || this.isThisLookUpItemHasAnyDescendantSelected(lookUpItem))
    );
  }

  public buildInitialSlide(lookUpsAsTree: LookUpItem[]): Slide[] {
    const slides: Slide[] = [];

    if (lookUpsAsTree && lookUpsAsTree.length > 0) {
      const currentSlideIndex = 0;
      let slideItemSelected = false;

      const _topParentSlideItems: SlideItem[] = [];
      const _topParentSlide: Slide = {
        parentSlideItem: null,
        parentSlide: null,
        slideIndex: currentSlideIndex,
        items: _topParentSlideItems,
      };
      slides.push(_topParentSlide);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      lookUpsAsTree.forEach((lookUpItem: LookUpItem, index: number) => {
        lookUpItem.children = Object.keys(lookUpItem.children).map(key => {
          return lookUpItem.children[key];
        });
        const _parentSlideItem: SlideItem = this.buildSlides(lookUpItem, _topParentSlide);

        if (this.isSlideValid(slideItemSelected, _parentSlideItem, lookUpItem)) {
          _parentSlideItem.selected = true;
          slideItemSelected = true;
        }
        _topParentSlideItems.push(_parentSlideItem);
      });
    } else {
      const _topParentSlideItems: SlideItem[] = [];
      const _topParentSlide: Slide = {
        parentSlideItem: null,
        parentSlide: null,
        slideIndex: 0,
        items: _topParentSlideItems,
      };
      slides.push(_topParentSlide);
    }

    return slides;
  }

  public addChildren(parentSlide: Slide, parentSlideItem: SlideItem, children: LookUpItem[]): void {
    const slides = [];

    const currentSlideIndex = this.slides.length;
    parentSlideItem.nextSlideIndex = currentSlideIndex;
    let slideItemSelected = false;

    const _slideItems: SlideItem[] = [];
    const _slide: Slide = { parentSlideItem, parentSlide, slideIndex: currentSlideIndex, items: _slideItems };
    slides.push(_slide);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children.forEach((lookUpItem: LookUpItem, index: number) => {
      lookUpItem.children = Object.keys(lookUpItem.children).map(key => {
        return lookUpItem.children[key];
      });
      const _slideItem: SlideItem = {
        id: lookUpItem.id ? lookUpItem.id : lookUpItem.facilityKey,
        name: lookUpItem.name ? lookUpItem.name : lookUpItem.facilityFullName,
        parentId: lookUpItem.parentId ? lookUpItem.parentId : lookUpItem.parentKey,
        lookUpItem,
        slide: _slide,
        nextSlideIndex: lookUpItem.children.length > 0 ? undefined : null,
      };
      if (
        !slideItemSelected &&
        this.selectedItemId &&
        (_slideItem.id === this.selectedItemId || this.isThisLookUpItemHasAnyDescendantSelected(lookUpItem))
      ) {
        _slideItem.selected = true;
        slideItemSelected = true;
      }
      _slideItems.push(_slideItem);
    });

    const newSlides = this.slides.concat(slides);
    this.slides = newSlides;
  }

  public isThisLookUpItemHasAnyDescendantSelected(lookUpItem: LookUpItem): boolean {
    if (this.selectedItemId) {
      const lookUpItemFound: LookUpItem = this.getLookUpItemById(lookUpItem.children, this.selectedItemId);
      return lookUpItemFound != null;
    } else {
      return false;
    }
  }

  public getLookUpItemById(lookUps: LookUpItem[], selectedItemId: number): LookUpItem {
    let lookUpItemFound: LookUpItem = null;

    const recurse = (_lookUps: LookUpItem[]) => {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < _lookUps.length; i++) {
        // Found the lookUpItem!
        if (_lookUps[i].id === selectedItemId || _lookUps[i].facilityKey === selectedItemId) {
          lookUpItemFound = _lookUps[i];
          break;
          // Did not match...
        } else {
          // Are there children / sub-categories? YES
          if (_lookUps[i].children && _lookUps[i].children.length > 0) {
            recurse(_lookUps[i].children);
            if (lookUpItemFound) {
              break;
            }
          }
        }
      }
    };

    recurse(lookUps);

    return lookUpItemFound;
  }

  public close() {
    this.itemSelected(null);
  }

  public handleItemClick(item: SlideItem) {
    if (item.nextSlideIndex === null) {
      this.itemSelected(item);
    } else {
      this.slideTo(item);
    }
  }

  public itemSelected(item: SlideItem) {
    if (item) {
      this._workOrderStateService.setSelectedFacilityTree(item);
    }
    this.viewCtrl.dismiss({ item });
  }

  public slideTo(itemOrIndex: SlideItem | number): void {
    if (itemOrIndex != null) {
      let nextSlideIndex = null;
      if ((itemOrIndex as SlideItem).id != null) {
        if ((itemOrIndex as SlideItem).nextSlideIndex != null) {
          nextSlideIndex = (itemOrIndex as SlideItem).nextSlideIndex;
        } else {
          // below we check that nextSlideIndex is undefined
          if ((itemOrIndex as SlideItem).nextSlideIndex !== null) {
            const item = itemOrIndex as SlideItem;
            this.addChildren(item.slide, item, item.lookUpItem.children);
            nextSlideIndex = item.nextSlideIndex;
          } else {
            throw new Error(
              `MultiLevelSelectDialogComponent: itemOrIndex.nextSlideIndex must not be null; itemOrIndex: ${JSON.stringify(
                itemOrIndex
              )}`
            );
          }
        }
      } else {
        nextSlideIndex = itemOrIndex as number;
      }
      setTimeout(() => {
        this.setCanSwipe(true);
        this.swiperSlides.slideTo(nextSlideIndex);
        this.setCanSwipe(false);
      }, 500);
    } else {
      throw new Error(
        `MultiLevelSelectDialogComponent: itemOrIndex must not be null; itemOrIndex: ${JSON.stringify(itemOrIndex)}`
      );
    }
  }
  setSwiperInstance(swiper: Swiper) {
    this.swiperSlides = swiper;
  }

  setCanSwipe(val: boolean) {
    this.swiperSlides.allowSlideNext = val;
    this.swiperSlides.allowSlidePrev = val;
  }
}
