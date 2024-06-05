import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabbbarPage } from './tabbbar.page';

const routes: Routes = [
  {
    path: '',
    component: TabbbarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabbbarPageRoutingModule {}
