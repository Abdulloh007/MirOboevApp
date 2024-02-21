import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../api/orders.service';
import { ToastController } from '@ionic/angular';
import { ToastService } from '../api/toast.service';

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
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.getDraftOrder()
    this.orderService.getOrders().subscribe((res: any) => {
      this.orders = res
    }, (err: any) => {
      this.toast.presentToast('Что-то пощло не так!', 'danger')
    })

  }

  getDraftOrder() {
    this.draftOrder = localStorage.getItem('orderDraft')
  }

}
