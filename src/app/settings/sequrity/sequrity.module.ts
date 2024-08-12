import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SequrityPageRoutingModule } from './sequrity-routing.module';

import { SequrityPage } from './sequrity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SequrityPageRoutingModule
  ],
  declarations: [SequrityPage]
})
export class SequrityPageModule {}
