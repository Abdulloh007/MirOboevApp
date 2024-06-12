import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoveOrdersPage } from './move-orders.page';
import { OrderComponent } from './order/order.component';
import { CreateComponent } from './create/create.component';
import { MonitoringComponent } from './monitoring/monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: MoveOrdersPage
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'create-order',
    component: CreateComponent
  },
  {
    path: 'edit',
    component: CreateComponent
  },
  {
    path: 'monitoring',
    component: MonitoringComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoveOrdersPageRoutingModule {}
