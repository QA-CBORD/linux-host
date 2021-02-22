import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
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

  constructor() { }

  ngOnInit() {}

  trackByLabel(_: number, assetTypeDetail: AssetTypeDetailValue): string {
    return assetTypeDetail.label;
  }

}
