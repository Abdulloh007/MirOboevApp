import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../api/orders.service';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../api/toast.service';
import { LoaderService } from '../api/loader.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: any[] = []
  draftOrder: any = {}
  constructor(
    private orderService: OrdersService,
    private toast: ToastService,
    private loaderSvr: LoaderService
  ) { }

  ngOnInit() {
    this.getDraftOrder()
    this.loaderSvr.showLoader = true
    this.orderService.getOrders().subscribe((res: any) => {
      this.orders = res
      this.loaderSvr.showLoader = false
    }, (err: any) => {
      this.toast.presentToast('Что-то пощло не так!', 'danger')
      this.loaderSvr.showLoader = false
    })

  }

  getDraftOrder() {
    this.draftOrder = localStorage.getItem('orderDraft')
  }

  handleRefresh(e: any) {
    this.orderService.getOrders().subscribe((res: any) => {
      this.orders = res
      e.target.complete();
    }, (err: any) => {
      this.toast.presentToast('Не удалось обновить данные!', 'danger')
    })

  }
}
