import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NonAssignmentsStateService } from '../non-assignments/non-assignments-state.service';
import { AssetTypeDetailsComponent } from './asset-type-details.component';

describe('AssetTypeDetailsComponent', () => {
  let component: AssetTypeDetailsComponent;
  let fixture: ComponentFixture<AssetTypeDetailsComponent>;

  beforeEach(() => {
    const nonAssignmentsStateServiceStub = () => ({
      setSelectedAssetType: selectedAsset => ({})
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AssetTypeDetailsComponent],
      providers: [
        {
          provide: NonAssignmentsStateService,
          useFactory: nonAssignmentsStateServiceStub
        }
      ]
    });
    fixture = TestBed.createComponent(AssetTypeDetailsComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
