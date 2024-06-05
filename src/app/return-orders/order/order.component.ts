import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'src/app/api/currency.service';
import { LoaderService } from 'src/app/api/loader.service';
import { ReturnsOrdersService } from 'src/app/api/returns-orders.service';
import { ToastService } from 'src/app/api/toast.service';
import { Role } from 'src/app/interfaces/Role';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent  implements OnInit {
  @ViewChild('pdf', { static: true }) pdfViewer!: ElementRef | any;
  order: any = {};
  pdfUrl: any;
  userRole: Role = {
    name: '',
    degree: 99999
  }
  // printerList: PrinterInterface[] = []
  // showPrinterList: boolean = false
  // printWithComment: boolean = false
  currencies: any[] = [];

  constructor(
    private orderService: ReturnsOrdersService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private loaderSvr: LoaderService,
    private currencySrv: CurrencyService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('role')) this.userRole = JSON.parse(localStorage.getItem('role') || JSON.stringify(this.userRole)) 
      this.route.queryParams.subscribe((params: any) => {
        if (params.id === 0 || params.id === '0') {
          this.order = JSON.parse(localStorage.getItem('ReturnOrderDraft') || '{}');
        } else {
          this.loaderSvr.showLoader = true
          this.orderService.getOrder(params.id).subscribe((res: any) => {
            this.order = res;
            this.loaderSvr.showLoader = false
            this.currencySrv.getCurencies().subscribe((res: any) => {
              this.currencies = res
              this.order.currency = res.find((item: any) => item.id === this.order.currency)
            })
          }, (err: any) => {
            this.toast.presentToast('Не удалось загрузить данные заказа', 'warning')
            this.loaderSvr.showLoader = false
          });
        }
      });
  }

}
