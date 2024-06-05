import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReturnOrdersPage } from './return-orders.page';
import { OrderComponent } from './order/order.component';
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnOrdersPage
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
    path: 'search',
    component: SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReturnOrdersPageRoutingModule {}
