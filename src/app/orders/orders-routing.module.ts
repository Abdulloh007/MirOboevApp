import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';
import { OrderComponent } from './order/order.component';
import { CreateComponent } from './create/create.component';
import { MonitoringComponent } from './monitoring/monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
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
export class OrdersPageRoutingModule {}
