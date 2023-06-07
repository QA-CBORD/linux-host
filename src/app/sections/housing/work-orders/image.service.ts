import { Injectable, SecurityContext } from "@angular/core";
import { WorkOrderStateService } from "./work-order-state.service";
import { HousingProxyService } from "../housing-proxy.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Filesystem, FilesystemDirectory } from "@capacitor/filesystem";
import { take } from "rxjs";
import { EnvironmentFacadeService } from "@core/facades/environment/environment.facade.service";
import { ImageData } from './work-orders.model'
import { isSuccessful } from '@sections/housing/utils/is-successful';
import { Response } from "../housing.model";

const IMAGE_DIR = 'stored-images';

@Injectable({
    providedIn: 'root'
})
export default class ImageService {

    private readonly MAX_WIDTH = 320;
    private readonly MAX_HEIGHT = 180;
    private readonly MIME_TYPE = 'image/png';
    private readonly QUALITY = 0.7;

    constructor(private _workOrderStateService: WorkOrderStateService, private _housingProxyService: HousingProxyService,
        private sanitizer: DomSanitizer, private _environment: EnvironmentFacadeService
    ) {

    }
    private workOrderListUrl = `${this._environment.getHousingAPIURL()}/patron-applications/v.1.0/work-orders`;
    sendWorkOrderImage(workOrderId: number, imageData: ImageData): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const workOrderImageURL = `${this.workOrderListUrl}/attachments`;

            const img = new Image();

            img.onerror = () => {
                reject('error load');
            };
            img.onload = async () => {
                const [newWidth, newHeight] = this.calculateSize(img, this.MAX_WIDTH, this.MAX_HEIGHT);
                const canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;

                const context = canvas.getContext('2d');
                context.drawImage(img, 0, 0, newWidth, newHeight);
                canvas.toBlob(
                    async blob => {
                        const data = (await this.convertBlobToBase64(blob)) as string;

                        const attachmentFile = data.replace(/^data:(.*,)?/, '');
                        const body = new ImageData({
                            filename: imageData.filename,
                            comments: 'student submitted attachment',
                            contents: attachmentFile,
                            studentSubmitted: true,
                            workOrderKey: workOrderId,
                        });

                        this._housingProxyService
                            .post<Response>(workOrderImageURL, body)
                            .pipe(take(1))
                            .subscribe((response: Response) => {
                                if (isSuccessful(response.status)) {
                                    this._workOrderStateService.destroyWorkOrderImageBlob();
                                    this.deleteImage();
                                    resolve(true);
                                    return true;
                                } else {
                                    throw new Error(response.status.message);
                                }
                            });
                    },
                    this.MIME_TYPE,
                    this.QUALITY
                );

                resolve(true);
            };
            img.src = this.sanitizer.sanitize(SecurityContext.URL, imageData?.photoUrl);
        });
    }

    private convertBlobToBase64 = (blob: Blob) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private calculateSize(img: any, maxWidth: number, maxHeight: number): number[] {
        let width = img.width;
        let height = img.height;

        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }
        } else {
            if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
            }
        }
        return [width, height];
    }

    async deleteImage() {
        await Filesystem.rmdir({
            directory: FilesystemDirectory.Data,
            path: `${IMAGE_DIR}`,
            recursive: true,
        });
    }
}
