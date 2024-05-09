import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoveOrdersPageRoutingModule } from './move-orders-routing.module';

import { MoveOrdersPage } from './move-orders.page';
import { OrderComponent } from './order/order.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MoveOrdersPageRoutingModule,
    PdfViewerModule
  ],
  declarations: [MoveOrdersPage, OrderComponent, CreateComponent]
})
export class MoveOrdersPageModule {}
