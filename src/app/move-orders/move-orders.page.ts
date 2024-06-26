import { Component, OnInit } from '@angular/core';
import { Role } from '../interfaces/Role';
import { ToastService } from '../api/toast.service';
import { LoaderService } from '../api/loader.service';
import { MovementOrdersService } from '../api/movementOrders.service';

@Component({
  selector: 'app-move-orders',
  templateUrl: './move-orders.page.html',
  styleUrls: ['./move-orders.page.scss'],
})
export class MoveOrdersPage implements OnInit {
  orders: any[] = []
  draftOrder: any = {}
  userRole: Role = {
    name: '',
    degree: 99999
  }

  constructor(
    private orderService: MovementOrdersService,
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
    this.draftOrder = localStorage.getItem('movementOrderDraft')
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
