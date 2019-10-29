import { Component, OnInit } from '@angular/core';
import { map, take, switchMap } from 'rxjs/operators';
import { Observable, zip } from 'rxjs';
import { Institution } from 'src/app/core/model/institution/institution.model';
import { InstitutionService } from 'src/app/core/service/institution/institution.service';
import { UserService } from 'src/app/core/service/user-service/user.service';
import { InstitutionPhotoInfo } from 'src/app/core/model/institution/institution-photo-info.model';

@Component({
  selector: 'st-access-card',
  templateUrl: './access-card.component.html',
  styleUrls: ['./access-card.component.scss'],
})
export class AccessCardComponent implements OnInit {
  /// X inst icon
  /// X inst name
  /// X user name
  /// GMC enabled barcode link
  /// mobile access enabled and link
  /// user photo
  /// apple wallet???

  institutionInfo: Institution;
  institutionPhoto: InstitutionPhotoInfo;
  userName: string = '';
  userPhoto: string = '';

  constructor(private readonly userService: UserService, private readonly institutionService: InstitutionService) {}

  ngOnInit() {
    this.setUserName();
    this.setUserPhoto();
    this.setInstitution();
  }

  private setUserName() {
    this.userService.userData.subscribe(userInfo => (this.userName = userInfo.firstName + userInfo.lastName));
  }

  private setUserPhoto() {
    this.userService
      .getAcceptedPhoto()
      .pipe(
        map(({ data, mimeType }) => `data:${mimeType};base64,${data}`),
        take(1)
      )
      .subscribe(
        (url: string) => {
          this.userPhoto = url;
        },
        error => {
          console.log(error);
        }
      );
  }

  private setInstitution() {
    this.userService.userData
      .pipe(
        switchMap(userData => {
          return zip(
            this.institutionService.getInstitutionDataById(userData.institutionId),
            this.institutionService.getInstitutionPhotoById(userData.institutionId)
          );
        })
      )
      .subscribe(([instInfo, instPhotoInfo]) => {
        this.institutionInfo = instInfo;
        this.institutionPhoto = instPhotoInfo;
      });
  }
}
