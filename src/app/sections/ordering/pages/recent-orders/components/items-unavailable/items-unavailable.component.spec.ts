import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsUnavailableComponent } from './items-unavailable.component';

describe('ItemsUnavailableComponent', () => {
  let component: ItemsUnavailableComponent;
  let fixture: ComponentFixture<ItemsUnavailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsUnavailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsUnavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
