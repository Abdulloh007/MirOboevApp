import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import { PrintersComponent } from './printers/printers.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'printers',
    component: PrintersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
