import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseOrdersPageRoutingModule } from './purchase-orders-routing.module';

import { PurchaseOrdersPage } from './purchase-orders.page';
import { OrderComponent } from './order/order.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseOrdersPageRoutingModule
  ],
  declarations: [PurchaseOrdersPage, OrderComponent, CreateComponent]
})
export class PurchaseOrdersPageModule {}
