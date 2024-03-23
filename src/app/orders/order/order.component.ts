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

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @ViewChild('pdf', { static: true }) pdfViewer!: ElementRef | any;
  order: any = {};
  pdfUrl: any;
  userRole: Role = {
    name: '',
    degree: 99999
  }
  printerList: PrinterInterface[] = []
  showPrinterList: boolean = false
  printWithComment: boolean = false

  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private loaderSvr: LoaderService
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
        }, (err: any) => {
          this.toast.presentToast('Не удалось загрузить данные заказа', 'warning')
          this.loaderSvr.showLoader = false
        });
      }
    });
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

  async printTest(printer: PrinterInterface) {
    this.loaderSvr.showLoader = true
    this.orderService.getOrderFormWithParams(this.order.id, this.printWithComment).subscribe(async (res: any) => {
      if (Capacitor.isNativePlatform()) {
        await Printer.printTest({ ...printer, value: res.file })
        .then((res: any) => this.toast.presentToast(res?.status), (err: any) => this.toast.presentToast(err?.status, 'danger'))
        .catch((err: any) => this.toast.presentToast(err?.status, 'danger'))
        .finally(() => {
          this.showPrinterList = false
          this.loaderSvr.showLoader = true
        });
      }else {
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

  setShowPrinter(isOpen: boolean) {
    this.printerList = JSON.parse(localStorage.getItem('printers') || '[]')
    this.showPrinterList = isOpen
  }

}
