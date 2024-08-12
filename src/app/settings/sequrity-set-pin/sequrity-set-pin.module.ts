import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SequritySetPinPageRoutingModule } from './sequrity-set-pin-routing.module';

import { SequritySetPinPage } from './sequrity-set-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SequritySetPinPageRoutingModule
  ],
  declarations: [SequritySetPinPage]
})
export class SequritySetPinPageModule {}
