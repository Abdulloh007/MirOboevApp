import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPageRoutingModule } from './payment-routing.module';

import { PaymentPage } from './payment.page';
import { ViewPaymentComponent } from './view/view.component';
import { TabbbarPageModule } from '../tabbbar/tabbbar.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPageRoutingModule,
    TabbbarPageModule
  ],
  declarations: [PaymentPage, ViewPaymentComponent, CreateComponent]
})
export class PaymentPageModule {}
