import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FindOutPage } from './find-out.page';

const routes: Routes = [
  {
    path: '',
    component: FindOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FindOutPageRoutingModule {}
