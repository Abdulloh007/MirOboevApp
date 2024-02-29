import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindOutPage } from './find-out.page';
import { PriceComponent } from './price/price.component';
import { BalanceComponent } from './balance/balance.component';

const routes: Routes = [
  {
    path: '',
    component: FindOutPage
  },
  {
    path: 'price',
    component: PriceComponent
  },
  {
    path: 'balance',
    component: BalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindOutPageRoutingModule {}
