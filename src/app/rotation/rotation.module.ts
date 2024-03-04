import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RotationPageRoutingModule } from './rotation-routing.module';

import { RotationPage } from './rotation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RotationPageRoutingModule
  ],
  declarations: [RotationPage]
})
export class RotationPageModule {}
