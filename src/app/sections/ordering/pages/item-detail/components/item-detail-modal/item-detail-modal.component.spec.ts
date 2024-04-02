import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ItemDetailModalComponent } from "./item-detail-modal.component";
import { PopoverConfig } from '@core/model/popover/popover.model';
import { buttons } from '@core/utils/buttons.config';
import { PopupTypes } from '@sections/rewards/rewards.config';

describe("ItemDetailModalComponent", () => {
  let component: ItemDetailModalComponent;
  let fixture: ComponentFixture<ItemDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemDetailModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize config correctly', () => {
    expect(component.config).toEqual({
      type: PopupTypes.SUCCESS,
      title: null,
      buttons: [{ ...buttons.OKAY, label: 'ok' }],
      message: '',
      code: '',
    } as PopoverConfig<string>);
  });
})