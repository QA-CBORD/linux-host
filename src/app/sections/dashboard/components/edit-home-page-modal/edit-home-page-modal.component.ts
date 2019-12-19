import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, IonReorderGroup } from '@ionic/angular';
import { tilesConfig } from '@sections/dashboard/dashboard.config';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'st-edit-home-page-modal',
  templateUrl: './edit-home-page-modal.component.html',
  styleUrls: ['./edit-home-page-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditHomePageModalComponent implements OnInit {
  homeConfigList$: Observable<TileWrapperConfig[]>;

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private readonly modalController: ModalController,
              private readonly tileConfigFacadeService: TileConfigFacadeService) {
  }

  ngOnInit() {
    this.homeConfigList$ = this.tileConfigFacadeService.tileSettings$();
  }

  onToggle({ detail: { value, checked } }) {
    // const choosedItem = this.homeConfigList.find(({ title }) => title === value);
    // choosedItem.isEnable = checked;
  }

  doReorder({ detail: { from, to }, detail }) {
    // let draggedItem = this.homeConfigList.splice(from, 1)[0];
    // this.homeConfigList.splice(to, 0, draggedItem);
    // detail.complete();
  }

  async onClickedClose() {
    await this.modalController.dismiss();
  }

  async onClickedDone() {

    await this.modalController.dismiss();
  }
}
