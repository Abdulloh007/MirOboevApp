import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoveOrdersPage } from './move-orders.page';

const routes: Routes = [
  {
    path: '',
    component: MoveOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoveOrdersPageRoutingModule {}
