import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncomePageRoutingModule } from './income-routing.module';

import { IncomePage } from './income.page';
import { ViewIncomeComponent } from './view-income/view-income.component';
import { CreateComponent } from './create/create.component';
import { TabbbarPageModule } from '../tabbbar/tabbbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncomePageRoutingModule,
    TabbbarPageModule
  ],
  declarations: [IncomePage, ViewIncomeComponent, CreateComponent]
})
export class IncomePageModule {}
