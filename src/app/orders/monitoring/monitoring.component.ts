import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { LoaderService } from 'src/app/api/loader.service';
import { OrdersService } from 'src/app/api/orders.service';
import { StorageService } from 'src/app/api/storage.service';
import { SubdivisionService } from 'src/app/api/subdivision.service';
import { ToastService } from 'src/app/api/toast.service';
import { UserService } from 'src/app/api/user.service';

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

  filter: any = {
    subdivision: {
      id: '',
      name: "",
      isActive: false
    },
    storage: {
      id: '',
      name: "",
      isActive: false
    },
    manager: {
      isActive: false,
      id: "",
      name: ""
    },
  }

  subdivisionSearchResult: any[] = []
  storageSearchResult: any[] = []
  managerSearchResult: any[] = []

  constructor(
    private orderSrv: OrdersService,
    private loaderSrv: LoaderService,
    private toast: ToastService,
    private subdivisionSrv: SubdivisionService,
    private storageService: StorageService,
    private userSrv: UserService,
  ) { }

  ngOnInit() {
    this.onPeriodSegmentChange()
  }

  onPeriodSegmentChange() {
    this.loaderSrv.showLoader = true
    this.orderSrv.getDeliveriesMonitor(this.filter).subscribe((res: any) => {
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

  searchManager(event: any) {
    if (event.target.value.length >= 3) {
      this.userSrv.searchUser(event.target.value).subscribe((res: any) => {
        this.managerSearchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.managerSearchResult = [];
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

  setManager(item: any) {
    this.filter.manager = {
      id: "",
      name: item.name,
      isActive: true
    }
    this.managerSearchResult = []
  }
}
