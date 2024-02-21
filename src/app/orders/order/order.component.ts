import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/api/orders.service';
import { ToastService } from 'src/app/api/toast.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  @ViewChild('pdf', { static: true }) pdfViewer!: ElementRef | any;
  order: any = {};
  pdfUrl: any;
  constructor(
    private orderService: OrdersService,
    private route: ActivatedRoute,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.id === 0 || params.id === '0') {
        this.order = JSON.parse(localStorage.getItem('orderDraft') || '{}');
      } else {
        this.orderService.getOrder(params.id).subscribe((res: any) => {
          this.order = res;
          this.orderService.getOrderForm(this.order.id).subscribe((res: any) => {
            const blobData = atob(res.file);
            const uintArray = new Uint8Array(blobData.length);
            for (let i = 0; i < blobData.length; i++) {
              uintArray[i] = blobData.charCodeAt(i);
            }
            const blob = new Blob([uintArray], { type: 'application/octet-stream' });
            this.pdfUrl = URL.createObjectURL(blob);
          }, (err: any) => this.toast.presentToast('Не удалось загрузить документ', 'warning'))
        }, (err: any) => this.toast.presentToast('Не удалось загрузить данные заказа', 'warning'));
      }
    });
  }

  printOrder() {
    window.print();
  }

}
