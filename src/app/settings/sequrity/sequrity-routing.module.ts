import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SequrityPage } from './sequrity.page';

const routes: Routes = [
  {
    path: '',
    component: SequrityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SequrityPageRoutingModule {}
