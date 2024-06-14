import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { LoaderService } from 'src/app/api/loader.service';
import { MovementOrdersService } from 'src/app/api/movementOrders.service';
import { StorageService } from 'src/app/api/storage.service';
import { SubdivisionService } from 'src/app/api/subdivision.service';
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
  filter: any = {
    subdivision: {
      id: '',
      name: '',
      isActive: false
    },
    storage: {
      id: '',
      name: '',
      isActive: false
    }
  }
  subdivisionSearchResult: any[] = []
  storageSearchResult: any[] = []

  constructor(
    private orderSrv: MovementOrdersService,
    private loaderSrv: LoaderService,
    private toast: ToastService,
    private subdivisionSrv: SubdivisionService,
    private storageService: StorageService,

  ) { }

  ngOnInit() {
    this.onPeriodSegmentChange()
  }

  onPeriodSegmentChange() {
    this.loaderSrv.showLoader = true
    this.orderSrv.getDeliveriesMonitor(this.filter).subscribe((res: any) => {
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

  searchSubdivision(event: any) {
    if (event.target.value.length >= 3) {
      this.subdivisionSrv.searchSubdivision(event.target.value).subscribe((res: any) => {
        this.subdivisionSearchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.subdivisionSearchResult = [];
    }
  }

  searchStorage(event: any) {
    if (event.target.value.length >= 3) {
      this.storageService.findStorage(event.target.value).subscribe((res: any) => {
        this.storageSearchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.storageSearchResult = [];
    }
  }

  setSubdivion(item: any) {
    this.filter.subdivision = {
      id: item.id,
      name: item.name,
      isActive: true
    }
    this.subdivisionSearchResult = []
  }

  setStorage(storage: string) {
    this.filter.storage.name = storage
    this.storageSearchResult = []
  }
}
