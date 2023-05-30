import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, IonReorderGroup } from '@ionic/angular';
import { TileWrapperConfig } from '@sections/dashboard/models';
import { TileConfigFacadeService } from '@sections/dashboard/tile-config-facade.service';
import { lastValueFrom, Observable } from 'rxjs';
import { first, take } from 'rxjs/operators';
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

  async doReorder({ detail: { from, to }, detail }): Promise<void> {
    const config = await lastValueFrom(this.homeConfigList$.pipe(first()));
    const movedElement = config.splice(from, 1)[0];
    config.splice(to, 0, movedElement);
    this.tileConfigFacadeService.updateConfigState(config);
    // Prevent Ionic from reordering any DOM nodes inside of the reorder group as we already did on splice.
    detail.complete(false);
  }

  async onClickedClose() {
    await this.modalController.dismiss();
  }

  async onClickedDone() {
    await this.modalController.dismiss();
  }
}

