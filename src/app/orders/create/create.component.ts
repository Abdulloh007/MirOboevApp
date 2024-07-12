import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { CameraService } from 'src/app/api/camera.service';
import { ClientService } from 'src/app/api/client.service';
import { LoaderService } from 'src/app/api/loader.service';
import { MasterService } from 'src/app/api/master.service';
import { OrdersService } from 'src/app/api/orders.service';
import { ProductsService } from 'src/app/api/products.service';
import { ToastService } from 'src/app/api/toast.service';
import { Order } from 'src/app/interfaces/Order';
import { Product } from 'src/app/interfaces/Product';
import { Capacitor } from '@capacitor/core';
import { CurrencyService } from 'src/app/api/currency.service';


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

  order: Order = {
    id: 0,
    link: 'Новый Заказ',
    date: new Date(),
    comment: '',
    products: [],
    sum: 0,
    discountSum: 0,
    currency: {
      id: '972',
      name: ""
    },
    delivery: {
      have_delivery: false,
      reciver: '',
      reciver_phone: '',
      reciver_address: '',
      deliver: '',
      deliver_phone: '',
      deliver_vehile: '',
      deliver_company: '',
      delivery_status: ''
    }
  };

  newProduct: any | Product = {
    id: 0,
    title: '',
    nick: '',
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
  currencies: any[] = [];
  currentCurrency: any = {
    id: '',
    name: ''
  }

  delivery_status: string[] = []

  showMeter: boolean = false
  showClientModal: boolean = false;
  showMaterModal: boolean = false;
  clientSearchResult: any[] = [];
  masterSearchResult: any[] = [];

  isSupported = false;
  barcodes: Barcode[] = [];
  constructor(
    private orderService: OrdersService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService,
    private loaderSvr: LoaderService,
    private clientSvr: ClientService,
    private masterSvr: MasterService,
    private currencySrv: CurrencyService
  ) { }

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      BarcodeScanner.isSupported().then((result) => {
        this.isSupported = result.supported;
      });
    }

    this.route.queryParams.subscribe((params: any) => {
      if (params.id !== undefined && (params.id === 0 || params.id === '0')) {
        this.order = JSON.parse(localStorage.getItem('orderDraft') || '{}');
      } else if (params.id !== undefined) {
        this.orderService.getOrder(params.id).subscribe((res: any) => {
          this.order = res;
          this.currecyChage()
        }, (err: any) => this.toast.presentToast('Не удалось загрузить данные заказа', 'warning'));
      } else {this.order.currency = "972"}
    });
    this.autoSaveOnLocalStorage();
    this.currencySrv.getCurencies().subscribe((res: any) => {
      this.currencies = res
      this.currecyChage()
    })
    this.orderService.getDeliveryStatus().subscribe((res: any) => this.delivery_status = res)
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
        this.order.sum -= processedProd.total;
        this.order.discountSum -= processedProd.discount;
        this.countProductTotal();
        processedProd.price = this.newProduct.price;
        processedProd.packCount = this.newProduct.packCount;
        processedProd.total = this.newProduct.total;
        processedProd.discount = this.newProduct.discount;
        this.order.sum = this.order.sum + processedProd.total;
        this.order.discountSum = this.order.discountSum + processedProd.discount;
      } else {
        const prevProd: Product | undefined = this.order.products.find(item => item === this.previosProduct);
        if (this.modalAction === 'edit' && !processedProd && prevProd) this.removeProduct(prevProd)
        this.countProductTotal();
        this.order.products.push(this.newProduct);
        this.order.sum += this.newProduct.total;
        this.order.discountSum += this.newProduct.discount;
        this.selectedProd = '';
      }
    }else if (this.modalAction === 'add') {
      this.countProductTotal();
      this.order.products.push(this.newProduct);
      this.order.sum += this.newProduct.total;
      this.order.discountSum += this.newProduct.discount;
      this.selectedProd = '';
    }
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
    // this.newProduct.isMeter = prod.isMeter; 
    this.showMeter = prod.isMeter; 
    this.searchResult = []; 
    this.getTotalPrice(); 
    this.getTotalBalance()
  }

  removeProduct(prod: Product) {
    const product = this.order.products.find(item => item === prod);
    if (product) {
      this.order.sum -= product.total || 0;
    }
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
      if(product?.isMeter) this.showMeter = true
      this.getTotalPrice()
      this.getTotalBalance()

    } else {
      this.modalAction = 'add';
      this.modalTitle = 'Добавить товар';
      this.modalButton = 'Добавить';
    }
  }

  autoSaveOnLocalStorage() {
    this.order.date = new Date();
    localStorage.setItem('orderDraft', JSON.stringify(this.order));
  }

  countProductTotal() {
    this.newProduct.total = (this.newProduct.price * this.newProduct.packCount) - this.newProduct.discount;
  }

  recountProductTotal() {
    this.newProduct.price = (this.newProduct.total + this.newProduct.discount) / this.newProduct.packCount
    this.newProduct.price = parseFloat(this.newProduct.price.toFixed(2))
  }

  countTotalDiscount() {
    const totalDiscount = 0;
    this.order.products.map(product => totalDiscount + product.discount);
    return totalDiscount;
  }

  saveOrder() {
    let body = this.order
    body.delivery.delivery_status = body.delivery.delivery_status.replace(" ", "")
    console.log(body.delivery.delivery_status);
    
    this.loaderSvr.showLoader = true
    this.toast.presentToast('Сохранение заказа...');
    this.orderService.createOrder(body).subscribe((res: any) => {
      this.router.navigate(['/orders']).then(() => {
        window.location.reload();
      });
      localStorage.removeItem('orderDraft');
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

  findOutPrice() {
    const prod: any =
      this.closeContext();
    this.modalAddonTitle = this.activeProduct;
    this.productsService.findOutPrice(this.activeProductId).subscribe((res: any) => {
      this.setOpenAlert(true);
      this.prices = res;
      this.activeProduct = '';
    }, (err: any) => this.toast.presentToast('Не удалось загрузить данные', 'warning'));
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

  getTotalPrice() {
    this.productsService.findOutPrice(this.newProduct.id).subscribe((res: any) => {
      this.prices = res
      const priceToShow = this.prices.find(price => price.default) || this.prices[0]
      this.newProduct.db_price = `${priceToShow?.price ? priceToShow.price : 0} ${priceToShow?.priceCurrency ? priceToShow.priceCurrency : 'TJS'}`
    })
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

  setClientModal(isOpen: boolean) {
    if (isOpen === true) {
      this.showClientModal = false;
    }
    this.showClientModal = isOpen;
  }

  setMasterModal(isOpen: boolean) {
    if (isOpen === true) {
      this.showMaterModal = false;
    }
    this.showMaterModal = isOpen;
  }

  toggleInfo(event: any) {
    if (event.target.localName === 'ion-button') {
      event.target.classList.toggle('show');
    } else {
      event.target.parentElement.classList.toggle('show');
    }
  }

  searchClient(event: any) {
    if (event.target.value.length >= 3) {
      this.clientSvr.searchClient(event.target.value).subscribe((res: any) => {
        this.clientSearchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.clientSearchResult = [];
    }
  }

  searchMaster(event: any) {
    if (event.target.value.length >= 3) {
      this.masterSvr.searchMaster(event.target.value).subscribe((res: any) => {
        this.masterSearchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    } else {
      this.masterSearchResult = [];
    }
  }

  setClient(client: any) {
    this.order.client = client;
    this.setClientModal(false)
    this.clientSearchResult = []
  }

  setMater(master: any) {
    this.order.master = master;
    this.setMasterModal(false)
    this.masterSearchResult = []
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

  currecyChage() {
    this.currentCurrency = this.currencies.find((item: any) => item.id === this.order.currency)
  }
}
