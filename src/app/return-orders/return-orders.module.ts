import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnOrdersPageRoutingModule } from './return-orders-routing.module';

import { ReturnOrdersPage } from './return-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnOrdersPageRoutingModule
  ],
  declarations: [ReturnOrdersPage]
})
export class ReturnOrdersPageModule {}
