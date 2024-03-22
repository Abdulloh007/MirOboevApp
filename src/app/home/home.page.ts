import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../interfaces/Role';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';
import { ToastService } from '../api/toast.service';
import { ProductsService } from '../api/products.service';
import { OrdersService } from '../api/orders.service';
import { AlertController } from '@ionic/angular';
import { LoaderService } from '../api/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  userRole: Role = {
    name: '',
    degree: 99999
  }

  isSupported = false;
  barcodes: Barcode[] = [];

  showProdInfo: boolean = false
  productBalance: any[] = [];
  searchResult: any[] = [];
  activeProduct: string = '';
  modalAddonTitle: string = '';

  constructor(
    private orderService: OrdersService,
    private productsService: ProductsService,
    private toast: ToastService,
    private alertController: AlertController,
    private loaderSvr: LoaderService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('role')) this.userRole = JSON.parse(localStorage.getItem('role') || JSON.stringify(this.userRole))
    if (Capacitor.isNativePlatform()) {
      BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(res => {
        if (!res.available) BarcodeScanner.installGoogleBarcodeScannerModule().then(() => {
          BarcodeScanner.isSupported().then((result) => {
            this.isSupported = result.supported;
          });
        })
      })

    }

  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
    this.qrHandler();
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
    if (barcode.rawValue.includes("hs/ver1/products?shkod=")) {
      const prodId = barcode.rawValue.split('=')[1];
      this.loaderSvr.showLoader = true
      this.productsService.getProductById(prodId).subscribe((res: any) => {
        this.modalAddonTitle = res.name
        this.findOutBalance(prodId)
      }, 
      err => this.toast.presentToast("Не удалось получить данные", "warning"), 
      () => this.loaderSvr.showLoader = false)
    } else if (barcode.rawValue.slice(0, 2) === "ZK") {
      const orderId = barcode.rawValue.slice(2, barcode.rawValue.length - 6)
      const alert = await this.alertController.create({
        header: "Номер заказа: " + decodeURI(orderId),
        buttons: ["OK"]
      })

      alert.present();
      // this.orderService.getOrder(orderId).subscribe((res: any) => {
      // }, (err: any) => this.toast.presentToast('Не удалось загрузить данные заказа', 'warning'));
    }
    this.barcodes = []
  }


  findOutBalance(prod: string) {
    this.productsService.findOutBalance(prod).subscribe((res: any) => {
      this.showProdInfo = true
      this.productBalance = res.allStorages;
      this.activeProduct = '';
    }, (err: any) => this.toast.presentToast('Не удалось загрузить данные', 'warning'));
  }

  getLocalBalnace() {
    let total: number = 0
    this.productBalance.map(item => total += item.balance)
    return total
  }
}
