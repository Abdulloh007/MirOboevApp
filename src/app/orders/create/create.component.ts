import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { OrdersService } from 'src/app/api/orders.service';
import { ProductsService } from 'src/app/api/products.service';
import { ToastService } from 'src/app/api/toast.service';

interface Order {
  id: number | string;
  link: string;
  date: string | Date;
  comment: string;
  products: Product[];
  sum: number;
}
interface Product {
  id: number | string;
  title: string;
  price: number;
  packCount: number;
  discount: number;
  total: number;
}

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
    sum: 0
  };

  newProduct: any | Product = {
    id: 0,
    title: '',
    price: 0,
    packCount: 0,
    discount: 0,
    total: 0,
    db_price: 0,
    db_balance: 0
  };

  searchResult: any[] = [];
  selectedProd: string = '';
  activeProduct: string = '';
  activeProductId: number | string = '';
  isModalOpen: boolean = false;
  modalAddonTitle: string = '';
  productBalance: any[] = [];
  isPriceOpen: boolean = false;
  prices: any[] = [];

  constructor(
    private orderService: OrdersService,
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.id !== undefined && (params.id === 0 || params.id === '0')) {
        this.order = JSON.parse(localStorage.getItem('orderDraft') || '{}');
      } else if (params.id !== undefined) {
        this.orderService.getOrder(params.id).subscribe((res: any) => {
          this.order = res;
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
      total: 0
    };
    this.searchResult = [];
    this.selectedProd = '';
    this.autoSaveOnLocalStorage();
    this.modal.isOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    let processedProd: Product | undefined = this.order.products.find(item => item.title === this.newProduct.title);
    if (processedProd) {
      this.order.sum -= processedProd.total;
      this.countProductTotal();
      processedProd.price = this.newProduct.price;
      processedProd.packCount = this.newProduct.packCount;
      processedProd.total = this.newProduct.total;
      this.order.sum = this.order.sum + processedProd.total;
    } else {
      if(this.selectedProd === '') {
        this.toast.presentToast('Вы не выбрали товар! Введите наменклатуру и выберите из списка.')
        return
      } 
      this.countProductTotal();
      this.order.products.push(this.newProduct);
      this.order.sum += this.newProduct.total;
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
      db_balance: 0
    };
    this.autoSaveOnLocalStorage();
    this.modal.isOpen = false;
    this.modal.dismiss(null, 'confirm');
  }

  removeProduct(title: string) {
    const product = this.order.products.find(item => item.title === title);
    if (product) {
      this.order.sum -= product.total || 0;
    }
    this.order.products = this.order.products.filter(item => item.title !== title);
  }

  searchProduct(event: any) {
    if (event.target.value.length >= 3) {
      this.productsService.searchProducts(event.target.value).subscribe((res: any) => {
        this.searchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    }
  }

  prepareAction(action: string, product?: Product) {
    this.modalAction = action;
    if (action === 'edit') {
      this.modalAction = 'edit';
      this.modalTitle = 'Изменить товар';
      this.modalButton = 'Изменить';
      this.newProduct = Object.assign({}, this.order.products.find(item => item.title === product?.title)) || this.newProduct;
      this.activeProductId = product?.id || ''
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
    this.newProduct.total = this.newProduct.price * this.newProduct.packCount;
  }

  saveOrder() {
    this.toast.presentToast('Сохранение заказа...');
    this.orderService.createOrder(this.order).subscribe((res: any) => {
      this.router.navigate(['/orders']).then(() => {
        window.location.reload();
      });
      localStorage.removeItem('orderDraft');
      this.toast.presentToast('Заказ успешно сохранен');
    }, (err: any) => this.toast.presentToast('Не удалось сохранить заказ', 'danger'));
  }

  printOrder() {
    this.orderService.getOrderForm(this.order.id).subscribe((res: any) => {
    })
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
    this.contextMenu.nativeElement.classList.remove('active');
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
      this.productBalance = res;
      this.activeProduct = '';
    }, (err: any) => this.toast.presentToast('Не удалось загрузить данные', 'warning'));
  }

  getTotalPrice() {
    this.productsService.findOutPrice(this.newProduct.id).subscribe((res: any) => { 
      this.prices = res
      this.newProduct.db_price = `${this.prices[0].price} ${this.prices[0].priceCurrency}` 
    })
    
  }

  getTotalBalance() {
    this.productsService.findOutBalance(this.newProduct.id).subscribe((res: any) => {
      this.productBalance = res
      this.newProduct.db_balance = this.getLocalBalnace()
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
    this.isPriceOpen = isOpen;
  }
}
