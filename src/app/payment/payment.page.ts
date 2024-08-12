import { Component, OnInit } from '@angular/core';
import { ToastService } from '../api/toast.service';
import { LoaderService } from '../api/loader.service';
import { PaymentService } from '../api/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  incomes: any[] = []

  constructor(
    private paymentSvr: PaymentService,
    private toast: ToastService,
    private loaderSvr: LoaderService
  ) { }

  ngOnInit() {
    this.loaderSvr.showLoader = true
    this.paymentSvr.getPayments().subscribe((res: any) => {
      this.incomes = res
      this.loaderSvr.showLoader = false
    }, (err: any) => {
      this.toast.presentToast('Что-то пощло не так!', 'danger')
      this.loaderSvr.showLoader = false
    })
  }

  handleRefresh(e: any) {
    this.paymentSvr.getPayments().subscribe((res: any) => {
      this.incomes = res
      e.target.complete();
    }, (err: any) => {
      this.toast.presentToast('Не удалось обновить данные!', 'danger')
    })

  }

}
