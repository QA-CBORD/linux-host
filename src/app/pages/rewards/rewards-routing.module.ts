import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RewardsPage } from './rewards.page';
import { LOCAL_ROUTING } from './rewards.config';
import { HistoryComponent } from './components/history';
import { StoreComponent } from './components/store';
import { LevelsComponent } from './components/levels';
import { RewardsResolverGuard } from './resolvers';
import { OptInGuard } from './guards';

const subRoutes: Routes = [
  {
    path: LOCAL_ROUTING.history,
    component: HistoryComponent,
    data: { preload: true },
  },
  {
    path: LOCAL_ROUTING.store,
    component: StoreComponent,
    data: { preload: true },
  },
  {
    path: LOCAL_ROUTING.levels,
    component: LevelsComponent,
    data: { preload: true },
  },
];

const routes: Routes = [
  {
    path: '',
    component: RewardsPage,
    children: subRoutes,
    resolve: { rewardTrackInfo: RewardsResolverGuard },
    canActivate: [OptInGuard],
    data: { preload: true },
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class RewardsRoutingModule {}
