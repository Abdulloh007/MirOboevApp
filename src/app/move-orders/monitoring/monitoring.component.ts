import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { LoaderService } from 'src/app/api/loader.service';
import { MovementOrdersService } from 'src/app/api/movementOrders.service';
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
  recives: any[] = []
  delivered: any[] = []
  recived: any[] = []

  constructor(
    private orderSrv: MovementOrdersService,
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
      this.recives = res.recives
      this.delivered = res.delivered
      this.recived = res.recived
      this.loaderSrv.showLoader = false
      this.refresher.complete()
      }, err => {
        this.loaderSrv.showLoader = false
        this.toast.presentToast('Не удалось загрузить данные', 'warning')
        this.refresher.complete()
    })
  }
}
