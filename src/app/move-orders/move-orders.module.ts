import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoveOrdersPageRoutingModule } from './move-orders-routing.module';

import { MoveOrdersPage } from './move-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoveOrdersPageRoutingModule
  ],
  declarations: [MoveOrdersPage]
})
export class MoveOrdersPageModule {}
