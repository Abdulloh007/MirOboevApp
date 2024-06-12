import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { LoaderService } from 'src/app/api/loader.service';
import { OrdersService } from 'src/app/api/orders.service';
import { ToastService } from 'src/app/api/toast.service';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
})
export class MonitoringComponent  implements OnInit {
  @ViewChild(IonRefresher) refresher!: IonRefresher
  segmentValue:  string = 'sends'
  sends: any[] = []
  delivered: any[] = []

  constructor(
    private orderSrv: OrdersService,
    private loaderSrv: LoaderService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.onPeriodSegmentChange()
  }

  onPeriodSegmentChange() {
    this.loaderSrv.showLoader = true
    this.orderSrv.getDeliveriesMonitor().subscribe((res: any) => {
      this.sends = res.sends
      this.delivered = res.delivered
      this.loaderSrv.showLoader = false 
      this.refresher.complete()
    }, err => {
      this.loaderSrv.showLoader = false
      this.refresher.complete()
      this.toast.presentToast('Не удалось загрузить данные', 'warning')
    })
  }
}
