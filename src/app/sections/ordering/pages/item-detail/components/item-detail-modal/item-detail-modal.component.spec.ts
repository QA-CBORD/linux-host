import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ItemDetailModalComponent } from './item-detail-modal.component';

describe('ItemDetailModalComponent', () => {
  let component: ItemDetailModalComponent;
  let fixture: ComponentFixture<ItemDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ItemDetailModalComponent]
    });
    fixture = TestBed.createComponent(ItemDetailModalComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
