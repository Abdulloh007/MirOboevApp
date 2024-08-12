import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentPage } from './payment.page';
import { ViewPaymentComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage
  },
  {
    path: 'view',
    component: ViewPaymentComponent
  },
  {
    path: 'create',
    component: CreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentPageRoutingModule {}
