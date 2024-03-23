import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../api/orders.service';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../api/toast.service';
import { LoaderService } from '../api/loader.service';
import { Role } from '../interfaces/Role';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: any[] = []
  draftOrder: any = {}
  userRole: Role = {
    name: '',
    degree: 99999
  }

  constructor(
    private orderService: OrdersService,
    private toast: ToastService,
    private loaderSvr: LoaderService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('role')) this.userRole = JSON.parse(localStorage.getItem('role') || JSON.stringify(this.userRole))
    this.getDraftOrder()
    this.loaderSvr.showLoader = true
    this.orderService.getOrders().subscribe((res: any) => {
      this.orders = res
      this.loaderSvr.showLoader = false
    }, (err: any) => {
      this.toast.presentToast('Не удалось загрузить список заказов!', 'danger')
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
      this.toast.presentToast('Не удалось загрузить список заказов!', 'danger')
      e.target.complete();
    })

  }
}
