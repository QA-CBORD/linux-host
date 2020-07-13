import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { ROLES } from './app.global';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROLES.guest,
  },
  {
    path: ROLES.patron,
    loadChildren: './sections/sections.module#SectionsModule',
  },
  {
    path: ROLES.guest,
    loadChildren: './non-authorized/non-authorized.module#NonAuthorizedModule',
  },
  { path: '**', redirectTo: ROLES.guest },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
