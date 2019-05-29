import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RewardsPage } from './rewards.page';
import { LOCAL_ROUTING } from './rewards.config';
import { HistoryComponent } from './components/history';
import { StoreComponent } from './components/store';
import { LevelsComponent } from './components/levels';
import { RewardsResolverGuard } from './resolvers';

const subRoutes: Routes = [
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
    // children: subRoutes,
    resolve: { rewardTrackInfo: RewardsResolverGuard }
  },
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class RewardsRoutingModule {}
