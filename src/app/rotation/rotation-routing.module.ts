import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RotationPage } from './rotation.page';

const routes: Routes = [
  {
    path: '',
    component: RotationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RotationPageRoutingModule {}
