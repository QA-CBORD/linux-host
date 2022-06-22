import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, IonReorderGroup } from '@ionic/angular';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'st-edit-home-page-modal',
  templateUrl: './edit-home-page-modal.component.html',
  styleUrls: ['./edit-home-page-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditHomePageModalComponent implements OnInit {
  homeConfigList$: Observable<TileWrapperConfig[]>;
  @ViewChild(IonReorderGroup, { static: true }) reorderGroup: IonReorderGroup;

  constructor(private readonly modalController: ModalController,
              private readonly tileConfigFacadeService: TileConfigFacadeService) {
  }

  ngOnInit() {
    this.homeConfigList$ = this.tileConfigFacadeService.tileSettings$;
  }

  async onToggle({ detail: { value, checked } }) {
    let config = await this.homeConfigList$.pipe(take(1)).toPromise();
    config = config.map((cfg) => cfg.title === value ? { ...cfg, isEnable: checked } : cfg);
    this.tileConfigFacadeService.updateConfigState(config);
  }

  async doReorder({ detail: { from, to }, detail }) {
    const config = await this.homeConfigList$.pipe(take(1)).toPromise();
    const movedElement = config.splice(from, 1)[0];
    config.splice(to, 0, movedElement);
    await this.tileConfigFacadeService.updateConfigState(config);
    detail.complete();
  }

  async onClickedClose() {
    await this.modalController.dismiss();
  }

  async onClickedDone() {
    await this.modalController.dismiss();
  }
}
