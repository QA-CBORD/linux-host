import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RewardsPage } from './rewards.page';
import { LOCAL_ROUTING } from './rewards.config';
import { HistoryComponent } from './components/history/history.component';
import { StoreComponent } from './components/store/store.component';
import { LevelsComponent } from './components/levels/levels.component';

const subRoutes: Routes = [
  { path: '', redirectTo: LOCAL_ROUTING.levels, pathMatch: 'full' },
  {
    path: LOCAL_ROUTING.history,
    component: HistoryComponent,
  },
  {
    path: LOCAL_ROUTING.store,
    component: StoreComponent,
  },
  {
    path: LOCAL_ROUTING.levels,
    component: LevelsComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    component: RewardsPage,
    children: subRoutes,
    resolve: {},
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class RewardsRoutingModule {}
