import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReturnOrdersPageRoutingModule } from './return-orders-routing.module';

import { ReturnOrdersPage } from './return-orders.page';
import { OrderComponent } from './order/order.component';
import { CreateComponent } from './create/create.component';
import { SearchComponent } from './search/search.component';
import { TabbbarPageModule } from '../tabbbar/tabbbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReturnOrdersPageRoutingModule,
    TabbbarPageModule
  ],
  declarations: [ReturnOrdersPage, OrderComponent, CreateComponent, SearchComponent]
})
export class ReturnOrdersPageModule {}
