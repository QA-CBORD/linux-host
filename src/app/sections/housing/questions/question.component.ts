import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

import { QuestionBase, QuestionBaseOptionValue } from './types/question-base';
import { QuestionHeader, QUESTIONS_TYPES } from './questions.model';
import { ApplicationsStateService } from '@sections/housing/applications/applications-state.service';
import { RequestedRoommate } from '../applications/applications.model';
import { TermsService } from '@sections/housing/terms/terms.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { ActionSheetController, Platform } from '@ionic/angular';
import { ToastService } from '../../../core/service/toast/toast.service';
import { WorkOrderStateService } from '../work-orders/work-order-state.service';
import { ContractListStateService } from '../contract-list/contract-list-state.service';
import { FacilityTree, ImageData, LocalFile, WorkOrdersFields } from '../work-orders/work-orders.model';
import { Filesystem, Directory as FilesystemDirectory } from '@capacitor/filesystem';

const IMAGE_DIR = 'stored-images';

import { CameraDirection, Photo, CameraResultType, CameraSource } from '@capacitor/camera';
import { CameraService } from '@sections/settings/pages/services/camera.service';
import { IdentityFacadeService } from '@core/facades/identity/identity.facade.service';

@Component({
  selector: 'st-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent implements OnInit, OnDestroy {
  facilityTreeData: FacilityTree[];
  facilityFullName: string;
  currectFacility: string;
  images: LocalFile[] = [];
  workOrderFieldsText: any = {
    notify: 'Would you like to receive updates?',
    phone: 'Enter your phone number.',
    email: 'Enter your email.',
    description: 'Describe what needs to be repaired.',
    location: 'Select the location where the repair is needed.',
  };

  constructor(
    private _changeDetector: ChangeDetectorRef,
    public _applicationsStateService: ApplicationsStateService, //TODO: delete
    private _termService: TermsService,
    private actionSheetCtrl: ActionSheetController,
    private identityFacadeService: IdentityFacadeService,
    private toastService: ToastService,
    private _workOrderStateService: WorkOrderStateService,
    private _contractListStateService: ContractListStateService,
    private plt: Platform,
    private cameraService: CameraService
  ) { }

  ngOnDestroy(): void {
    this._applicationsStateService.setRequestedRoommates([]);
    this._applicationsStateService.setRoommatesPreferences([]);
    this._applicationsStateService.emptyRequestedRoommate();
    this._applicationsStateService.deleteRoommatePreferencesSelecteds();
    this._workOrderStateService.destroyWorkOrderImage();
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.roommateSearchOptions$ = this._applicationsStateService.roommateSearchOptions;
    this._initTermsSubscription();
    this._initGetImage();
    this._setFacility();
  }

  @Input() question: QuestionBase;

  @Input() name: string;

  @Input() parentGroup: FormGroup;

  @Input() isSubmitted: boolean;

  public image$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  requestedRoommates$: Observable<RequestedRoommate[]>;
  roommateSearchOptions$: any;
  private selectedTermKey: number = 0;
  private subscriptions: Subscription = new Subscription();

  customActionSheetOptions: { [key: string]: string } = {
    cssClass: 'custom-deposit-actionSheet',
  };

  errorMessages: any = {
    required: 'This field is required',
    numeric: 'This field should be numeric',
    integer: 'This field should be integer',
    string: 'This field should be string',
  };

  date = new Date();

  createHeader(question: QuestionHeader): string {
    const headerWeight: number = parseInt(question.subtype, 10);
    const headerCssClass: string =
      headerWeight > 1 ? 'question__secondary-header ion-text-uppercase' : 'question__primary-header';

    return `<${question.subtype} class="${headerCssClass}">${question.label}</${question.subtype}>`;
  }

  check(): void {
    this._changeDetector.markForCheck();
  }

  touch(): void {
    const controls: { [key: string]: AbstractControl } = this.parentGroup.controls;

    Object.keys(controls).forEach((controlName: string) => {
      controls[controlName].markAsTouched();
      controls[controlName].markAsDirty();
    });

    this.check();
  }

  trackByLabel(_: number, option: QuestionBaseOptionValue): string {
    return option.label;
  }

  private _initTermsSubscription() {
    this.subscriptions.add(this._termService.termId$.subscribe(termId => (this.selectedTermKey = termId)));
  }

  private _initGetImage() {
    const getImageSub = this._workOrderStateService.workOrderImage$.subscribe(res => {
      if (!!(res && res.contents)) {
        const extension = res.filename.split('.').pop();
        const imageContent = res.contents.startsWith('data:image')
          ? res.contents
          : `data:image/${extension};base64,${res.contents}`;

        this.image$.next(imageContent);
      } else {
        this.image$.next(null);
      }
    });

    this.subscriptions.add(getImageSub);
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

    if (!cameraSource) {
      return;
    }
    this.onGetPhoto(cameraSource);
  }
  async onGetPhoto(cameraSource: CameraSource) {
    this.getPhoto(cameraSource);
  }

  /// Camera plugin control
  private async getPhoto(cameraSource: CameraSource) {
    // const uploadSettings = this.photoUploadService.photoUploadSettings;
    /// set session state to allow user to return from camera without logging in again, this would disrupt the data transfer
    const image = await this.cameraService.getPhoto({
      quality: 90,
      height: 500,
      width: 500,
      allowEditing: false,
      correctOrientation: true,
      preserveAspectRatio: true,
      direction: CameraDirection.Rear,
      resultType: CameraResultType.Uri,
      source: cameraSource,
      saveToGallery: true,
    }).finally(() => {
      this.identityFacadeService.onNavigateExternal({ makeVaultUnLockable: true, estimatedTimeInMillis: 600000 });
    });

    if (image) {
      this.saveImage(image);
    }
  }

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    if (this.plt.is('hybrid')) {
      try {
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: FilesystemDirectory.Data,
        });
      } catch (error) {
      }
    }

    const fileName = new Date().getTime() + '.PNG';
    await Filesystem.writeFile({
      path: `${IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: FilesystemDirectory.Data,
    });

    const image: ImageData = {
      comments: '',
      photoUrl: this.plt.is('hybrid') ? photo.webPath : base64Data,
      filename: fileName,
      contents: base64Data,
      studentSubmitted: true,
      workOrderKey: 0,
    };
    this._workOrderStateService.setWorkOrderImage(image);
    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
  }

  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  async loadFiles() {
    this.images = [];

    Filesystem.readdir({
      path: IMAGE_DIR,
      directory: FilesystemDirectory.Data,
    }).then(
      async result => {
        await this.loadFileData(result.files);
      },
      async err => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: IMAGE_DIR,
          directory: FilesystemDirectory.Data,
        });
      }
    );
  }

  async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${IMAGE_DIR}/${f}`;

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: FilesystemDirectory.Data,
      });

      this.images.push({
        name: f,
        path: filePath,
        data: `${readFile.data}`,
      });
      this.startUpload(this.images[0], readFile.data);
    }
  }

  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: FilesystemDirectory.Data,
      path: file.path,
    });
    this.loadFiles();
    this.presentToast('File removed.');
  }

  async startUpload(file: LocalFile, value: string) {
    const imageFormat = file.name.split('.')[1];
    const rawData = atob(value);
    const bytes = new Array(rawData.length);
    for (var x = 0; x < rawData.length; x++) {
      bytes[x] = rawData.charCodeAt(x);
    }
    const arr = new Uint8Array(bytes);
    const blob = new Blob([arr], { type: `image/${imageFormat}` });

    const formData = new FormData();
    formData.append('attachmentFile', blob, file.name);
    this._workOrderStateService.setWorkOrderImageBlob(formData);
  }

  private async presentToast(message: string) {
    await this.toastService.showToast({ message, duration: 5000 });
  }

  isWorkOrderDescription(question) {
    return question.source === 'WORK_ORDER' && question.workOrderFieldKey === 'DESCRIPTION';
  }

  getLabel(question) {
    if (question.source === 'WORK_ORDER') {
      if (question.workOrderFieldKey === WorkOrdersFields.FACILITY) {
        return this.workOrderFieldsText.location;
      }
      if (question.workOrderFieldKey === WorkOrdersFields.NOTIFY_BY_EMAIL) {
        return this.workOrderFieldsText.notify;
      } else if (question.workOrderFieldKey === WorkOrdersFields.DESCRIPTION) {
        return this.workOrderFieldsText.description;
      } else if (question.workOrderFieldKey === WorkOrdersFields.PHONE_NUMBER) {
        return this.workOrderFieldsText.phone;
      }
      return this.workOrderFieldsText.email;
    }
    return question.label;
  }

  _setFacility() {
    if (this.question.type !== QUESTIONS_TYPES.FACILITY) return;

    this.facilityTreeData = this._workOrderStateService.workOrderDetails.getValue().facilityTree;
    this.currectFacility = this._contractListStateService.getContractDetails()[0].fullName;
    if (this.facilityTreeData.length === 1 && !this.isSubmitted && this.question.type === QUESTIONS_TYPES.FACILITY) {
      this.isSubmitted = true;
      this.facilityFullName = this.facilityTreeData[0].facilityFullName;
      this._workOrderStateService.setSelectedFacilityTree({
        name: this.facilityFullName,
        facilityKey: this._contractListStateService.getContractDetails()[0].facilityKey,
      });
    }

    if (this.facilityTreeData.length > 1 && this.question.type === QUESTIONS_TYPES.FACILITY) {
      this._workOrderStateService.setSelectedFacilityTree({
        name: this.currectFacility,
        facilityKey: this._contractListStateService.getContractDetails()[0].facilityKey,
      });
    }
  }
}
