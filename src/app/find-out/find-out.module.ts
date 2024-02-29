import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FindOutPageRoutingModule } from './find-out-routing.module';

import { FindOutPage } from './find-out.page';
import { PriceComponent } from './price/price.component';
import { BalanceComponent } from './balance/balance.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FindOutPageRoutingModule
  ],
  declarations: [FindOutPage, PriceComponent, BalanceComponent]
})
export class FindOutPageModule {}
