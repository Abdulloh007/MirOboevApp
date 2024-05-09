import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';
import { IonModal } from '@ionic/angular';
import { ClientService } from 'src/app/api/client.service';
import { LoaderService } from 'src/app/api/loader.service';
import { MovementOrdersService } from 'src/app/api/movementOrders.service';
import { ProductsService } from 'src/app/api/products.service';
import { StorageService } from 'src/app/api/storage.service';
import { ToastService } from 'src/app/api/toast.service';
import { MovementOrder } from 'src/app/interfaces/Order';
import { Product } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @ViewChild(IonModal) modal !: IonModal;
  @ViewChild('contextmenu') contextMenu !: ElementRef;
  modalAction: string = 'add';
  modalTitle: string = 'Добавить товар';
  modalButton: string = 'Добавить';

  order: MovementOrder = {
    id: 0,
    link: 'Новый Заказ',
    date: new Date(),
    comment: '',
    products: [],
    storageOut: "",
    storageIn: ""
  };

  newProduct: any | Product = {
    id: 0,
    title: '',
    price: 0,
    packCount: 0,
    discount: 0,
    total: 0,
    db_price: 0,
    db_balance: 0,
    isMeter: false
  };

  searchResult: any[] = [];
  selectedProd: string = '';
  activeProduct: string = '';
  activeProductId: number | string = '';
  previosProduct: Product | null = {
    id: '',
    title: '',
    price: 0,
    packCount: 0,
    discount: 0,
    total: 0,
    isMeter: false
  };

  isModalOpen: boolean = false;
  modalAddonTitle: string = '';
  productBalance: any[] = [];
  productMyBalance: any
  isPriceOpen: boolean = false;
  prices: any[] = [];

  showMeter: boolean = false
  showStorageInModal: boolean = false;
  showStorageOutModal: boolean = false;
  clientSearchResult: any[] = [];
  storageSearchResult: any[] = [];
  
  totalProdBalance: number = 0

  isSupported = false;
  barcodes: Barcode[] = [];

  constructor(
    private orderService: MovementOrdersService,
    private productsService: ProductsService,
    private storageService: StorageService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private loaderSvr: LoaderService,

  ) { }

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      BarcodeScanner.isSupported().then((result) => {
        this.isSupported = result.supported;
      });
    }

    this.route.queryParams.subscribe((params: any) => {
      if (params.id !== undefined && (params.id === 0 || params.id === '0')) {
        this.order = JSON.parse(localStorage.getItem('movementOrderDraft') || '{}');
      } else if (params.id !== undefined) {
        this.orderService.getOrder(params.id).subscribe((res: any) => {
          this.order = res;
          this.getTotalProdBalance()
        }, (err: any) => this.toast.presentToast('Не удалось загрузить данные заказа', 'warning'));
      }
    });
    this.autoSaveOnLocalStorage();
  }

  cancel() {
    this.newProduct = {
      id: 0,
      title: '',
      price: 0,
      packCount: 0,
      discount: 0,
      total: 0,
      isMeter: false
    };
    this.showMeter = false;
    this.searchResult = [];
    this.selectedProd = '';
    this.autoSaveOnLocalStorage();
    this.modal.isOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    if (this.newProduct.title === '') {
      this.toast.presentToast('Вы не выбрали товар! Введите наменклатуру и выберите из списка.')
      return
    }
    if (this.modalAction === 'edit') {
      let processedProd: Product | undefined = this.order.products.find(item => item === this.newProduct);
      if (processedProd) {

        processedProd.price = this.newProduct.price;
        processedProd.packCount = this.newProduct.packCount;
        processedProd.total = this.newProduct.total;
        processedProd.discount = this.newProduct.discount;

      } else {
        const prevProd: Product | undefined = this.order.products.find(item => item === this.previosProduct);
        if (this.modalAction === 'edit' && !processedProd && prevProd) this.removeProduct(prevProd)

        this.order.products.push(this.newProduct);
        this.selectedProd = '';
      }
    } else if (this.modalAction === 'add') {

      this.order.products.push(this.newProduct);
      this.selectedProd = '';
    }
    this.getTotalProdBalance();
    this.newProduct = {
      id: 0,
      title: '',
      price: 0,
      packCount: 0,
      discount: 0,
      total: 0,
      db_price: 0,
      db_balance: 0,
      isMeter: false,
    };
    this.autoSaveOnLocalStorage();
    this.modal.isOpen = false;
    this.showMeter = false;
    this.modal.dismiss(null, 'confirm');
  }

  setProd(prod: any) {
    this.selectedProd = prod.name;
    this.newProduct.title = prod.name;
    this.newProduct.id = prod.id;
    this.searchResult = [];
    this.getTotalBalance()
  }

  removeProduct(prod: Product) {
    const product = this.order.products.find(item => item === prod);

    this.order.products = this.order.products.filter(item => item !== product);
  }

  searchProduct(event: any) {
    if (event.target.value.length >= 3) {
      this.productsService.searchProducts(event.target.value).subscribe((res: any) => {
        this.searchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.searchResult = [];
    }
  }

  prepareAction(action: string, product?: Product) {
    this.modalAction = action;
    if (action === 'edit') {
      this.modalAction = 'edit';
      this.modalTitle = 'Изменить товар';
      this.modalButton = 'Изменить';
      this.newProduct = Object.assign({}, product) || this.newProduct;
      this.activeProductId = product?.id || ''
      this.previosProduct = product || null
      this.getTotalBalance()

    } else {
      this.modalAction = 'add';
      this.modalTitle = 'Добавить товар';
      this.modalButton = 'Добавить';
    }
  }

  autoSaveOnLocalStorage() {
    this.order.date = new Date();
    localStorage.setItem('movementOrderDraft', JSON.stringify(this.order));
  }

  saveOrder() {
    this.loaderSvr.showLoader = true
    this.toast.presentToast('Сохранение заказа...');
    this.orderService.createOrder(this.order).subscribe((res: any) => {
      this.router.navigate(['/move-orders']).then(() => {
        window.location.reload();
      });
      localStorage.removeItem('movementOrderDraft');
      this.loaderSvr.showLoader = false
      this.toast.presentToast('Заказ успешно сохранен');
    }, (err: any) => {
      this.loaderSvr.showLoader = false
      this.toast.presentToast('Не удалось сохранить заказ', 'danger')
    });
  }

  contexMenu(event: any, title: string, id: number | string) {
    // event?.preventDefault();
    this.contextMenu.nativeElement.classList.add('active');
    if (window.innerWidth - event.clientX < 200) {
      this.contextMenu.nativeElement.style.left = event.clientX - 200 + 'px';
    } else {
      this.contextMenu.nativeElement.style.left = event.clientX + 'px';
    }
    this.contextMenu.nativeElement.style.top = event.clientY + 'px';
    this.activeProduct = title;
    this.activeProductId = id;
  }

  closeContext() {
    setTimeout(() => this.contextMenu.nativeElement.classList.remove('active'), 100)
  }

  findOutBalance() {
    this.closeContext();
    this.modalAddonTitle = this.activeProduct;
    this.productsService.findOutBalance(this.activeProductId).subscribe((res: any) => {
      this.setOpen(true);
      this.productBalance = res.allStorages;
      this.productMyBalance = res.myStorage;
      this.activeProduct = '';
    }, (err: any) => this.toast.presentToast('Не удалось загрузить данные', 'warning'));
  }

  getTotalBalance() {
    this.productsService.findOutBalance(this.newProduct.id).subscribe((res: any) => {
      this.productBalance = res.allStorages
      this.productMyBalance = res.myStorage
      this.newProduct.db_balance = this.getLocalBalnace().toFixed(2)
    })
  }

  getLocalBalnace() {
    let total: number = 0
    this.productBalance.map(item => total += item.balance)
    return total
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setOpenAlert(isOpen: boolean) {
    if (isOpen === true) {
      this.isPriceOpen = false;
    }
    this.isPriceOpen = isOpen;
  }

  setStorageInModal(isOpen: boolean) {
    if (isOpen === true) {
      this.showStorageInModal = false;
    }
    this.showStorageInModal = isOpen;
  }

  setStorageOutModal(isOpen: boolean) {
    if (isOpen === true) {
      this.showStorageOutModal = false;
    }
    this.showStorageOutModal = isOpen;
  }

  toggleInfo(event: any) {
    if (event.target.localName === 'ion-button') {
      event.target.classList.toggle('show');
    } else {
      event.target.parentElement.classList.toggle('show');
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
    if (barcode.rawValue.includes("hs/ver1/products?shkod=")) {
      const prodId = barcode.rawValue.split('=')[1];
      this.loaderSvr.showLoader = true;
      this.productsService.getProductById(prodId).subscribe((res: any) => {
        this.prepareAction('add');
        this.modal.isOpen = true;
        this.setProd(res)
      }, () => this.toast.presentToast("Неудалось найти продукт!"),
        () => this.loaderSvr.showLoader = false)
    }
    this.barcodes = []
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

  setStorage(storage: string, type: string) {
    if (type === "IN") {
      this.order.storageIn = storage
      this.setStorageInModal(false)
    } else if (type === "OUT") {
      this.order.storageOut = storage
      this.setStorageOutModal(false)
    }
    this.storageSearchResult = []
  }

  getTotalProdBalance() {
    this.totalProdBalance = 0
    this.order.products.map(prod => this.totalProdBalance += prod.packCount)
  }
}
