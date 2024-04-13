import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InquirerPageRoutingModule } from './inquirer-routing.module';

import { InquirerPage } from './inquirer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InquirerPageRoutingModule
  ],
  declarations: [InquirerPage]
})
export class InquirerPageModule {}
