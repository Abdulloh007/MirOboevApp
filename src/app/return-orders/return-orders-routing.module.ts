import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnOrdersPage } from './return-orders.page';

const routes: Routes = [
  {
    path: '',
    component: ReturnOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnOrdersPageRoutingModule {}
