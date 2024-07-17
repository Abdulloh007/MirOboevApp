import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/api/orders.service';
import { ToastService } from 'src/app/api/toast.service';
import * as printJS from 'print-js';
import Printer from 'src/app/directives/printer.plugin';
import { Capacitor } from '@capacitor/core';
import { LoaderService } from 'src/app/api/loader.service';
import { Role } from 'src/app/interfaces/Role';
import { Printer as PrinterInterface } from 'src/app/interfaces/Printer';
import { CurrencyService } from 'src/app/api/currency.service';
import { PrintersService } from 'src/app/api/printers.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @ViewChild('pdf', { static: true }) pdfViewer!: ElementRef | any;
  order: any = {
    delivery: {
      delivery_status: ''
    }
  };
  pdfUrl: any;
  userRole: Role = {
    name: '',
    degree: 99999
  }
  printerList: PrinterInterface[] = []
  serverPrinters: any[] = []
  showPrinterList: boolean = false
  printWithComment: boolean = false
  isActionSheetOpen = false;

  currencies: any[] = [];
  delivery_status: any[] = []
  selectedPrinter: any = {
    printer: {},
    printer_type: ''
  }
  public actionSheetButtons = [
    {
      text: 'Заказ клиента QR',
      data: {
        action: 'form_1',
      },
    },
    {
      text: 'Заказ клиента QR с мастером',
      data: {
        action: 'form_2',
      },
    },
    {
      text: 'Заказ клиента QR (Кухня, Зал, Детская)',
      data: {
        action: 'form_3',
      },
    },
    {
      text: 'Отмена',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private loaderSvr: LoaderService,
    private currencySrv: CurrencyService,
    private printerSrv: PrintersService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('role')) this.userRole = JSON.parse(localStorage.getItem('role') || JSON.stringify(this.userRole))
    this.route.queryParams.subscribe((params: any) => {
      if (params.id === 0 || params.id === '0') {
        this.order = JSON.parse(localStorage.getItem('orderDraft') || '{}');
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
    this.orderService.getDeliveryStatus().subscribe((res: any) => this.delivery_status = res)
  }

  printOrder() {
    this.loaderSvr.showLoader = true
    this.orderService.getOrderForm(this.order.id).subscribe(async (res: any) => {
      if (Capacitor.isNativePlatform()) {
        await Printer.print({ value: res.file });
      }
      else {
        const blobData = atob(res.file);
        const uintArray = new Uint8Array(blobData.length);
        for (let i = 0; i < blobData.length; i++) {
          uintArray[i] = blobData.charCodeAt(i);
        }
        const blob = new Blob([uintArray], { type: 'application/octet-stream' });
        this.pdfUrl = URL.createObjectURL(blob);
        setTimeout(() => printJS({ printable: 'pdf', type: 'html' }), 1000)

      }
      this.loaderSvr.showLoader = false
    }, (err: any) => {
      this.toast.presentToast('Не удалось загрузить документ', 'warning')
      this.loaderSvr.showLoader = false
    })
  }

  async printTest(printer: PrinterInterface, form_type?: string) {
    this.loaderSvr.showLoader = true
    this.orderService.getOrderFormWithParams(this.order.id, this.printWithComment, form_type).subscribe(async (res: any) => {
      if (Capacitor.isNativePlatform()) {
        await Printer.printTest({ ...printer, value: res.file })
          .then((res: any) => this.toast.presentToast(res?.status), (err: any) => this.toast.presentToast(err?.status, 'danger'))
          .catch((err: any) => this.toast.presentToast(err?.status, 'danger'))
          .finally(() => {
            this.showPrinterList = false
            this.loaderSvr.showLoader = true
          });
      } else {
        const blobData = atob(res.file);
        const uintArray = new Uint8Array(blobData.length);
        for (let i = 0; i < blobData.length; i++) {
          uintArray[i] = blobData.charCodeAt(i);
        }
        const blob = new Blob([uintArray], { type: 'application/octet-stream' });
        this.pdfUrl = URL.createObjectURL(blob);
        setTimeout(() => printJS({ printable: 'pdf', type: 'html' }), 1000)

      }
      this.loaderSvr.showLoader = false;

    }, (err: any) => {
      this.toast.presentToast('Не удалось загрузить документ', 'warning')
      this.loaderSvr.showLoader = false
    })
  }

  printOnServer(printer: any, form_type?: string) {
    this.loaderSvr.showLoader = true
    this.printerSrv.PrintOrder({
      id: this.order.id,
      printer_id: printer.id,
      quantity: 1,
      form: form_type
    }).subscribe(() => {
      this.loaderSvr.showLoader = false
      this.toast.presentToast("Печать запущена...")
    }, (err: any) => {
      this.toast.presentToast('Не удалось загрузить документ', 'warning')
      this.loaderSvr.showLoader = false
    }, () => {
      this.showPrinterList = false
      this.loaderSvr.showLoader = false
    })
  }

  setShowPrinter(isOpen: boolean) {
    this.printerList = JSON.parse(localStorage.getItem('printers') || '[]')
    this.serverPrinters = JSON.parse(localStorage.getItem('serverPrinters') || '[]')
    this.showPrinterList = isOpen
  }


  changeStatus() {
    let newStatus = this.order.delivery.delivery_status.replaceAll(" ", "")
    console.log(newStatus);
    
    let body = {
      id: this.order.id,
      delivery_status: newStatus
    }

    this.loaderSvr.showLoader = true
    this.toast.presentToast('Сохранение заказа...');
    this.orderService.updateDeliveryStatus(body).subscribe((res: any) => {
      this.loaderSvr.showLoader = false
      this.toast.presentToast('Заказ успешно сохранен');
    }, (err: any) => {
      this.loaderSvr.showLoader = false
      this.toast.presentToast('Не удалось сохранить заказ', 'danger')
    });


  }

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
    if(!isOpen) this.showPrinterList = false
  }
  printSelectedForm(event: any) {
    // console.log(event.detail.data.action);
    // console.log(this.selectedPrinter);
    if (this.selectedPrinter.printer_type == 'ip_printer') {
      this.printTest(this.selectedPrinter.printer, event.detail.data.action)
    }else if(this.selectedPrinter.printer_type == 'server_printer') {
      this.printOnServer(this.selectedPrinter.printer, event.detail.data.action);
    }
    this.isActionSheetOpen = false;
    this.showPrinterList = false
  }

}
