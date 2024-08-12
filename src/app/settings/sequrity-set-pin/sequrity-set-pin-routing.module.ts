import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SequritySetPinPage } from './sequrity-set-pin.page';

const routes: Routes = [
  {
    path: '',
    component: SequritySetPinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SequritySetPinPageRoutingModule {}
