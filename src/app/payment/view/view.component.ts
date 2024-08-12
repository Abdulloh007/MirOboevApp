import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/api/loader.service';
import { PaymentService } from 'src/app/api/payment.service';
import { ToastService } from 'src/app/api/toast.service';
import { Income } from 'src/app/interfaces/Income';

@Component({
  selector: 'app-view-income',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewPaymentComponent  implements OnInit {

  income: Income = {
    id: '',
    link: '',
    date: '',
    client: '',
    sum: 0,
    base_document: undefined,
    currency: ''
  }

  constructor(
    private paymentSvr: PaymentService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private loaderSvr: LoaderService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
    
      this.loaderSvr.showLoader = true
      this.paymentSvr.getPayment(params.id).subscribe((res: any) => {
        this.income = res;
        this.loaderSvr.showLoader = false
      }, (err: any) => {
        this.toast.presentToast('Не удалось загрузить данные заказа', 'warning')
        this.loaderSvr.showLoader = false
      });
    });
  }

}
