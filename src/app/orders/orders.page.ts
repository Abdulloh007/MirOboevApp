import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../api/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: any[] = []
  draftOrder: any = {}
  constructor(
    private orderService: OrdersService
  ) { }

  ngOnInit() {
    this.getDraftOrder()
    this.orderService.getOrders().subscribe((res: any) => {
      this.orders = res
    })
    
  }

  getDraftOrder() {
    this.draftOrder = localStorage.getItem('orderDraft')
  }

}
