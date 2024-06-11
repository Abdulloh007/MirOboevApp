import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdersPageRoutingModule } from './orders-routing.module';

import { OrdersPage } from './orders.page';
import { OrderComponent } from './order/order.component';
import { CreateComponent } from './create/create.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TabbbarPageModule } from '../tabbbar/tabbbar.module';
import { MonitoringComponent } from './monitoring/monitoring.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdersPageRoutingModule,
    PdfViewerModule,
    TabbbarPageModule
  ],
  declarations: [OrdersPage, OrderComponent, CreateComponent, MonitoringComponent]
})
export class OrdersPageModule {}
