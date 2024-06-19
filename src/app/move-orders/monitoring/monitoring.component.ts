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
  ect: any[] = []
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
    },
    storageOut: {
      id: '',
      name: '',
      isActive: false
    },
    storageIn: {
      id: '',
      name: '',
      isActive: false
    }
  }
  subdivisionSearchResult: any[] = []
  storageSearchResult: any[] = []
  storageOutSearchResult: any[] = []
  storageInSearchResult: any[] = []

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
      this.ect = res.ect
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

  searchStorageOut(event: any) {
    if (event.target.value.length >= 3) {
      this.storageService.findStorage(event.target.value).subscribe((res: any) => {
        this.storageOutSearchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.storageOutSearchResult = [];
    }
  }

  searchStorageIn(event: any) {
    if (event.target.value.length >= 3) {
      this.storageService.findStorage(event.target.value).subscribe((res: any) => {
        this.storageInSearchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.storageInSearchResult = [];
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

  setStorageOut(storage: string) {
    this.filter.storageOut.name = storage
    this.storageOutSearchResult = []
  }

  setStorageIn(storage: string) {
    this.filter.storageIn.name = storage
    this.storageInSearchResult = []
  }
}
