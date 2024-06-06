import { Injectable } from '@angular/core';
import { SettingsFacadeService } from '@core/facades/settings/settings-facade.service';
import { UserPhotoUploadSettings } from '@core/model/user/user-photo-upload-settings.model';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { UserPhotoInfo, UserPhotoList } from '@core/model/user';
import { Settings } from '../../../../app.global';
import SettingList = Settings.SettingList;
import Setting = Settings.Setting;
import { UserFacadeService } from '@core/facades/user/user.facade.service';
import { first, switchMap, take, tap } from 'rxjs/operators';
import { SettingInfoList } from '@core/model/configuration/setting-info-list.model';
import { DeleteModalComponent } from '@sections/settings/pages/delete-modal/delete-modal.component';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Orientation } from '../photo-crop-modal/photo-crop-modal.component';
import { CameraSource } from '@capacitor/camera';

export enum PhotoStatus {
  PENDING,
  ACCEPTED,
  REJECTED,
  REPLACED,
  DELETED,
}

export enum PhotoType {
  PROFILE_PENDING = -1,
  PROFILE = 0,
  GOVT_ID_FRONT = 1,
  GOVT_ID_BACK = 2,
}

@Injectable({ providedIn: 'root' })
export class PhotoUploadService {
  private readonly _govtIdFront$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(null);
  private readonly _govtIdBack$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(null);
  private readonly _profileImage$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(null);
  private readonly _profileImagePending$: BehaviorSubject<UserPhotoInfo> = new BehaviorSubject<UserPhotoInfo>(null);
  private readonly _govtIdRequired$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  orientation: Orientation;

  private userPhotoUploadSettings: UserPhotoUploadSettings = {
    cacheTimeoutMinutes: null,
    displayHeight: null,
    displayWidth: null,
    maxUploadSize: null,
    saveHeight: null,
    saveWidth: null,
  };

  constructor(
    private readonly settingsFacadeService: SettingsFacadeService,
    private readonly userFacadeService: UserFacadeService,
    private readonly modalController: ModalController,
    private readonly actionSheetCtrl: ActionSheetController
  ) {}

  get photoUploadSettings() {
    return this.userPhotoUploadSettings;
  }

  get govtIdFront$(): Observable<UserPhotoInfo> {
    return this._govtIdFront$.asObservable();
  }

  get govtIdBack$(): Observable<UserPhotoInfo> {
    return this._govtIdBack$.asObservable();
  }

  get profileImage$(): Observable<UserPhotoInfo> {
    return this._profileImage$.asObservable();
  }

  get profileImagePending$(): Observable<UserPhotoInfo> {
    return this._profileImagePending$.asObservable();
  }

  get governmentIdRequired$(): Observable<boolean> {
    return this._govtIdRequired$.asObservable();
  }

  private set _govtIdFront(value: UserPhotoInfo) {
    this._govtIdFront$.next(value);
  }

  private set _govtIdBack(value: UserPhotoInfo) {
    this._govtIdBack$.next(value);
  }

  private set _profileImage(value: UserPhotoInfo) {
    this._profileImage$.next(value);
  }

  private set _profileImagePending(value: UserPhotoInfo) {
    this._profileImagePending$.next(value);
  }

  private set governmentIdRequired(value: boolean) {
    this._govtIdRequired$.next(value);
  }

  /// get photo upload settings and fetch and handle photos
  getInitialPhotoData$(): Observable<UserPhotoInfo[]> {
    return zip(
      this.settingsFacadeService.fetchSettingList(SettingList.PHOTO_UPLOAD),
      this.settingsFacadeService.getSetting(Setting.GOVT_PHOTO_ID_REQUIRED),
      this.userFacadeService.getPhotoList()
    ).pipe(
      switchMap(([photoUploadSettings, govtIdRequired, photoInfoList]) => {
        /// populate upload settings if they exist
        this.governmentIdRequired = Boolean(JSON.parse(govtIdRequired.value));
        this.populatePhotoUploadSettings(photoUploadSettings);
        if (photoInfoList && !photoInfoList.empty) {
          return this.fetchUserPhotosInList(photoInfoList);
        }
        return of([]);
      })
    );
  }

  /// get photo data by status Accepted and Pending and fetch array of photos
  private fetchUserPhotosInList(photoList: UserPhotoList): Observable<UserPhotoInfo[]> {
    const validPhotos = photoList.list.filter(({ status }) =>
      [PhotoStatus.ACCEPTED, PhotoStatus.PENDING].includes(status)
    );
    if (!validPhotos.length) {
      return of([]);
    }
    return of(validPhotos).pipe(
      switchMap(photoList => zip(...photoList.map(({ id }) => this.handleUserPhotoById(id))))
    );
  }

  /// fetch photo by id and set the data here if it exists
  handleUserPhotoById(photoId: string): Observable<UserPhotoInfo> {
    return this.userFacadeService.getPhotoById(photoId).pipe(tap(photoInfo => this.setPhotoInfo(photoInfo)));
  }

  private setPhotoInfo(photoInfo: UserPhotoInfo) {
    switch (photoInfo?.type) {
      case PhotoType.PROFILE:
        if (photoInfo.status === PhotoStatus.ACCEPTED) {
          this._profileImage = photoInfo;
        } else {
          this._profileImagePending = photoInfo;
        }
        break;
      case PhotoType.GOVT_ID_FRONT:
        this._govtIdFront = photoInfo;
        break;
      case PhotoType.GOVT_ID_BACK:
        this._govtIdBack = photoInfo;
        break;
    }
  }

  /// populate photo upload settings from settings list
  private populatePhotoUploadSettings(settingsList: SettingInfoList) {
    /// return if no settings data
    if (!settingsList || !settingsList.list) {
      return;
    }
    /// reduce array of settingInfo into HashMap of key-value pairs
    const tempList = settingsList.list.reduce((map, { name, value }) => {
      map[name.split('_').join('')] = value;
      return map;
    }, {});

    /// assign setting values to the object property
    Object.keys(this.userPhotoUploadSettings).forEach(prop => {
      if (tempList[prop.toLowerCase()]) {
        this.userPhotoUploadSettings[prop] = tempList[prop.toLowerCase()];
      }
    });
  }

  onNewPhoto(photoType: PhotoType, photoData: string) {
    const newPhotoInfo: UserPhotoInfo = {
      externalId: null,
      userId: null,
      mimeType: 'image/jpg',
      status: null,
      statusReason: null,
      data: photoData,
      id: null,
      insertTime: null,
      lastUpdated: null,
      version: null,
      type: photoType,
    };
    this.setPhotoInfo(newPhotoInfo);
  }

  clearLocalGovernmentIdPhotos() {
    this._govtIdFront = null;
    this._govtIdBack = null;
  }

  clearLocalProfilePhoto() {
    this._profileImage = null;
    this._profileImagePending = null;
  }

  clearLocalPendingPhoto() {
    this._profileImagePending = null;
  }

  submitPhoto(newPhoto: UserPhotoInfo): Observable<boolean> {
    return this.userFacadeService.addUserPhoto(newPhoto).pipe(
      tap(success => {
        if (success) {
          newPhoto.status = newPhoto.type === PhotoType.PROFILE ? PhotoStatus.PENDING : PhotoStatus.ACCEPTED;
          this.setPhotoInfo(newPhoto);
        }
      }),
      first()
    );
  }

  async presentDeletePhotoModal(photoId: string) {
    const modal = await this.modalController.create({
      component: DeleteModalComponent,
    });
    modal.onDidDismiss().then(data => {
      if (data.data === true) {
        this.userFacadeService
          .updateUserPhotoStatus(photoId, PhotoStatus.DELETED, 'Patron deleted photo')
          .pipe(take(1))
          .subscribe();
        this.clearLocalGovernmentIdPhotos();
        this._profileImagePending = null;
      }
    });

    return await modal.present();
  }

  async presentPhotoTypeSelection() {
    const photoSourceAS = await this.actionSheetCtrl.create({
      keyboardClose: true,
      backdropDismiss: true,
      buttons: [
        {
          text: 'Take photo',
          role: 'take-photo',
          icon: '/assets/icon/camera-outline.svg',
        },
        {
          text: 'Choose existing photo',
          role: 'select-photo',
          icon: '/assets/icon/select-photo.svg',
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await photoSourceAS.present();

    let cameraSource: CameraSource = null;

    await photoSourceAS.onWillDismiss().then(result => {
      if (result.role === 'take-photo') {
        cameraSource = CameraSource.Camera;
      } else if (result.role === 'select-photo') {
        cameraSource = CameraSource.Photos;
      }
    });

    return cameraSource;
  }
}
