import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserLocalProfileService } from '../user-local-profile.service';
import { first } from 'rxjs';

export const userFullnameResolverResolver: ResolveFn<void> = () => {
  const userLocalProfileService = inject(UserLocalProfileService)
  return userLocalProfileService.updateUserName().pipe(first());
};
