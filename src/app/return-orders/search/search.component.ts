import { Component, OnInit, ViewChild } from '@angular/core';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { IonModal } from '@ionic/angular';
import { LoaderService } from 'src/app/api/loader.service';
import { OrdersService } from 'src/app/api/orders.service';
import { ProductsService } from 'src/app/api/products.service';
import { ReturnsOrdersService } from 'src/app/api/returns-orders.service';
import { SubdivisionService } from 'src/app/api/subdivision.service';
import { ToastService } from 'src/app/api/toast.service';
import { UserService } from 'src/app/api/user.service';
import { Product } from 'src/app/interfaces/Product';
import { Role } from 'src/app/interfaces/Role';
import { OverlayEventDetail } from '@ionic/core/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent  implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  userRole: Role = {
    name: '',
    degree: 99999
  }
  
  filters: any = {
    product: {
      id: "",
      name: "",
      isActive: false
    },
    periodFrom: {
      isActive: false,
      value: ""
    },
    periodTo: {
      isActive: false,
      value: ""
    },
    subdivision: {
      isActive: false,
      id: "",
      name: ""
    },
    sum: {
      isActive: false,
      value: 0
    },
    quantity: {
      isActive: false,
      value: 0
    },
    manager: {
      isActive: false,
      id: "",
      name: ""
    },
    order: {
      isActive: false,
      id: ""
    }
  }
  
  searchResult: any[] = []
  prodSearchResult: any[] = []
  managerSearchResult: any[] = []
  subdivisionSearchResult: any[] = []
  barcodes: Barcode[] = []
  selectedOrder: any = {}
  showOrderModal: boolean = false

  constructor(
    private toast: ToastService,
    private loaderSvr: LoaderService,
    private ordersSvr: ReturnsOrdersService,
    private clientOrdersSvr: OrdersService,
    private productsService: ProductsService,
    private subdivisionSrv: SubdivisionService,
    private userSrv: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('role')) this.userRole = JSON.parse(localStorage.getItem('role') || JSON.stringify(this.userRole))
  }
  
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    this.qrHandler()
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    this.toast.presentToast('Please grant camera permission to use the barcode scanner.', 'warning');
  }

  async qrHandler() {
    const barcode = this.barcodes[0]
    if (barcode.rawValue.slice(0, 2) === "ZK") {
      const orderId = barcode.rawValue.slice(2, barcode.rawValue.length - 6)
      this.filters.order.id = decodeURI(orderId);
      this.filters.order.isActive = true;
    } else this.toast.presentToast('Не правильный формат кода!')
    this.barcodes = []
  }

  searchProduct(event: any) {
    if (event.target.value.length >= 3) {
      this.productsService.searchProducts(event.target.value).subscribe((res: any) => {
        this.prodSearchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.prodSearchResult = [];
    }
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

  searchManager(event: any) {
    if (event.target.value.length >= 3) {
      this.userSrv.searchUser(event.target.value).subscribe((res: any) => {
        this.managerSearchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.managerSearchResult = [];
    }
  }
  
  setProd(prod: any) {
    this.filters.product = {
      id: prod.id,
      name: prod.name,
      isActive: true
    }
    this.prodSearchResult = []
  }

  setSubdivion(item: any) {
    this.filters.subdivision = {
      id: item.id,
      name: item.name,
      isActive: true
    }
    this.subdivisionSearchResult = []
  }

  setManager(item: any) {
    this.filters.manager = {
      id: "",
      name: item.name,
      isActive: true
    }
    this.managerSearchResult = []
  }

  search() {
    this.loaderSvr.showLoader = true
    if (this.filters.order.id != '') this.filters.order.isActive = true 
    this.ordersSvr.searchRealization(this.filters).subscribe((res: any) => {
      this.searchResult = res
    },(err: any) => {
      this.toast.presentToast('Не удалось загрузить данные!', 'warning')
    }, () => this.loaderSvr.showLoader = false)
  }

  cancel() {
    this.showOrderModal = false
  }

  confirm() {
    this.showOrderModal = false
    this.modal.dismiss()
    this.router.navigate(['/return-orders/create-order'], {queryParams: {realizationId: this.selectedOrder.id}})
  }

  setShowOrderModal(order: any) {
    this.selectedOrder = order
    this.showOrderModal = true
  }
}
