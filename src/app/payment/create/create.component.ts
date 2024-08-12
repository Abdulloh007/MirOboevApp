import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/api/client.service';
import { LoaderService } from 'src/app/api/loader.service';
import { PaymentService } from 'src/app/api/payment.service';
import { ToastService } from 'src/app/api/toast.service';
import { NewIncome } from 'src/app/interfaces/Income';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent  implements OnInit {
  showClientModal: boolean = false
  newIncome: NewIncome = {
    sum: 0
  }
  clientSearchResult: any[] = []

  constructor(
    private paymentSrv: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private loaderSvr: LoaderService,
    private clientSvr: ClientService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.base !== undefined) {
        this.paymentSrv.getBaseInfo(params.base).subscribe((res: any) => {
          this.newIncome.sum = res.sum;
          this.newIncome.base = params.base;
          this.newIncome.client = res.client;
        })
      } 
    });
  }

  saveIncome() {
    this.loaderSvr.showLoader = true
    this.toast.presentToast('Сохранение заказа...');
    this.paymentSrv.createPayment(this.newIncome).subscribe((res: any) => {
      this.router.navigate(['/income']).then(() => {
        window.location.reload();
      });
      this.loaderSvr.showLoader = false
      this.toast.presentToast('ПКО успешно сохранен');
    }, (err: any) => {
      this.loaderSvr.showLoader = false
      this.toast.presentToast('Не удалось сохранить ПКО', 'danger')
    });
  }
  
  setClientModal(isOpen: boolean) {
    this.showClientModal = isOpen;
  }

  searchClient(event: any) {
    if (event.target.value.length >= 3) {   
      this.clientSvr.searchClient(event.target.value).subscribe((res: any) => {
        this.clientSearchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.clientSearchResult = [];
    }
  }

  setClient(client: any) {
    this.newIncome.client = client;
    this.setClientModal(false)
    this.clientSearchResult = []
  }

}
