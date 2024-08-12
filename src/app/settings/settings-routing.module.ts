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
  },
  {
    path: 'sequrity',
    loadChildren: () => import('./sequrity/sequrity.module').then( m => m.SequrityPageModule)
  },
  {
    path: 'sequrity-set-pin',
    loadChildren: () => import('./sequrity-set-pin/sequrity-set-pin.module').then( m => m.SequritySetPinPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
