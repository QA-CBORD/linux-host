import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserLocalProfileService } from '../user-local-profile.service';

export const userFullnameResolverResolver: ResolveFn<void> = (route, state) => {
  const userLocalProfileService = inject(UserLocalProfileService)
  return userLocalProfileService.updateUserName();
};
