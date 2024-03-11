import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/api/products.service';
import { ToastService } from 'src/app/api/toast.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent  implements OnInit {
  isModalOpen: boolean = false;
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


  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  searchProduct(event: any) {
    if (event.target.value.length >= 3) {
      this.productsService.searchProducts(event.target.value).subscribe((res: any) => {
        this.searchResult = res;
      }, (err: any) => this.toast.presentToast('Данные не найдены', 'warning'));
    }
  }
  
  findOutBalance() {
    this.productsService.findOutBalance(this.activeProduct).subscribe((res: any) => {
      this.setOpen(true);
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
