import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NonAssignmentsStateService } from '../non-assignments/non-assignments-state.service';
import { AssetTypeDetailValue } from '../non-assignments/non-assignments.model';
import { QuestionAssetTypeDetails } from '../questions/types';

@Component({
  selector: 'st-asset-type-details',
  templateUrl: './asset-type-details.component.html',
  styleUrls: ['../questions/question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetTypeDetailsComponent implements OnInit {
  @Input() question: QuestionAssetTypeDetails;
  @Input() parentGroup: FormGroup;
  @Input() isSubmitted: boolean;

  constructor(private _nonAssignmentStateService: NonAssignmentsStateService) { }

  ngOnInit() { }

  trackByLabel(_: number, assetTypeDetail: AssetTypeDetailValue): string {
    return assetTypeDetail.label;
  }

  markItemAsSelected(assetType: number): void {
    this._nonAssignmentStateService.setSelectedAsset(assetType);
  }
}
