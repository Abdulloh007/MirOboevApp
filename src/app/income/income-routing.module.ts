import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncomePage } from './income.page';
import { ViewIncomeComponent } from './view-income/view-income.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: IncomePage
  },
  {
    path: 'view',
    component: ViewIncomeComponent
  },
  {
    path: 'create',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncomePageRoutingModule {}
