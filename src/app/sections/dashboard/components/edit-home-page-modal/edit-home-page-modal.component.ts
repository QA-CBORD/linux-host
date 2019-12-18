import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, IonReorderGroup } from '@ionic/angular';
import { tilesConfig } from '@sections/dashboard/dashboard.config';
import { TileWrapperConfig } from '@sections/dashboard/models';

@Component({
  selector: 'st-edit-home-page-modal',
  templateUrl: './edit-home-page-modal.component.html',
  styleUrls: ['./edit-home-page-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditHomePageModalComponent implements OnInit {
  homeConfigList: TileWrapperConfig[] = [];

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private readonly modalController: ModalController) {}

  ngOnInit() {
    const localConfig = this.getConfigFromLocalStorage();

    this.homeConfigList = tilesConfig && !localConfig ? tilesConfig : localConfig;
  }

  onToggle({ detail: { value, checked } }) {
    const choosedItem = this.homeConfigList.find(({ title }) => title === value);
    choosedItem.isEnable = checked;
  }

  doReorder({ detail: { from, to }, detail }) {
    let draggedItem = this.homeConfigList.splice(from, 1)[0];
    this.homeConfigList.splice(to, 0, draggedItem);
    detail.complete();
  }

  private getConfigFromLocalStorage(): TileWrapperConfig[] {
    return JSON.parse(localStorage.getItem('homePageConfig'));
  }

  private setConfigToLocalStorage(configList) {
    localStorage.setItem('homePageConfig', JSON.stringify(configList));
  }

  async onClickedClose() {
    await this.modalController.dismiss();
  }

  async onClickedDone() {
    this.setConfigToLocalStorage(this.homeConfigList);

    await this.modalController.dismiss();
  }
}
