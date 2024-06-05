import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquirerPageRoutingModule } from './inquirer-routing.module';

import { InquirerPage } from './inquirer.page';
import { TabbbarPageModule } from '../tabbbar/tabbbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InquirerPageRoutingModule,
    TabbbarPageModule
  ],
  declarations: [InquirerPage]
})
export class InquirerPageModule {}
