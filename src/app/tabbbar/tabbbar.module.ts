import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabbbarPageRoutingModule } from './tabbbar-routing.module';

import { TabbbarPage } from './tabbbar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabbbarPageRoutingModule
  ],
  declarations: [TabbbarPage],
  exports: [TabbbarPage]
})
export class TabbbarPageModule {}
