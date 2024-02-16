import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OrdersService } from 'src/app/api/orders.service';
import { ProductsService } from 'src/app/api/products.service';

interface Order {
  link: string;
  date: string | Date;
  comment: string;
  products: Product[];
  sum: number;
}
interface Product {
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
  modalAction: string = 'add';
  modalTitle: string = 'Добавить товар';
  modalButton: string = 'Добавить';

  order: Order = {
    link: 'Новый Заказ',
    date: new Date(),
    comment: '',
    products: [],
    sum: 0
  };

  newProduct: Product = {
    title: '',
    price: 0,
    packCount: 0,
    discount: 0,
    total: 0
  };

  searchResult: string[] = [];

  constructor(
    private orderService: OrdersService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {      
      if (params.id === 0 || params.id === '0') {
        this.order = JSON.parse(localStorage.getItem('orderDraft') || '{}');
      }else if (params.id) {
        this.orderService.getOrder(params.id).subscribe((res: any) => {
          this.order = res;
        });
        this.order.link = "Редактировать заказ";
      }
      
    });
    this.autoSaveOnLocalStorage();
  }

  cancel() {
    this.modal.isOpen = false;
    this.modal.dismiss(null, 'cancel');
  }

  confirm() { 
    if (this.modalAction === 'add') {
      this.countProductTotal();   
      this.order.products.push(this.newProduct);
      this.order.sum += this.newProduct.total;
    } else if (this.modalAction === 'edit') {
      let processedProd: Product | undefined = this.order.products.find(item => item.title === this.newProduct.title);
      console.log(processedProd);
      if (processedProd) {
        this.order.sum -= processedProd.total;
        this.countProductTotal();  
        processedProd = this.newProduct;
        console.log(processedProd);
        this.order.sum = this.order.sum + processedProd.total;
        console.log(this.order.sum);
        
      }
    }
    this.newProduct = {
      title: '',
      price: 0,
      packCount: 0,
      discount: 0,
      total: 0
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
      });
    }
  }

  prepareAction(action: string) {
    this.modalAction = action;
    if (action === 'edit') {
      this.modalAction = 'edit';
      this.modalTitle = 'Изменить товар';
      this.modalButton = 'Изменить';
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
    this.orderService.createOrder(this.order).subscribe((res: any) => {
      console.log(res);
    });
  }

}
