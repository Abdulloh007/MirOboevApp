import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/api/products.service';
import { ToastService } from 'src/app/api/toast.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent  implements OnInit {
  isPriceOpen: boolean = false;
  prices: any[] = [];
  productBalance: any[] = [];
  searchResult: any[] = [];
  activeProduct: string = '';
  modalAddonTitle: string = '';

  constructor(
    private productsService: ProductsService,
    private toast: ToastService
  ) { }

  ngOnInit() {}

  setOpenAlert(isOpen: boolean) {
    this.isPriceOpen = isOpen;
  }

  searchProduct(event: any) {
    if (event.target.value.length >= 3) {
      this.productsService.searchProducts(event.target.value).subscribe((res: any) => {
        this.searchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    }
  }

  findOutPrice() {
    this.productsService.findOutPrice(this.activeProduct).subscribe((res: any) => {
      this.setOpenAlert(true);
      this.prices = res;
      this.activeProduct = '';
    }, (err: any) => this.toast.presentToast('Не удалось загрузить данные', 'warning'));
  }
}
