import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/service/user-service/user.service';
import { MUserPhotoInfo } from '../../../core/model/user/user-photo-info.interface';
import { of } from 'rxjs/internal/observable/of';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-activate-location',
  templateUrl: './activate-location.component.html',
  styleUrls: ['./activate-location.component.scss'],
})
export class ActivateLocationComponent implements OnInit {
  photoUrl: Observable<string>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.photoUrl = this.userService
      .getAcceptedPhoto()
      .pipe(map(({ data, mimeType }) => `data:${mimeType};base64,${data}`));
  }
}
