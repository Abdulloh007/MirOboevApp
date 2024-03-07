import { Component, OnInit } from '@angular/core';
import { ToastService } from '../api/toast.service';
import { LoaderService } from '../api/loader.service';
import { IncomeService } from '../api/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.page.html',
  styleUrls: ['./income.page.scss'],
})
export class IncomePage implements OnInit {
  incomes: any[] = []

  constructor(
    private incomeSvr: IncomeService,
    private toast: ToastService,
    private loaderSvr: LoaderService
  ) { }

  ngOnInit() {
    this.loaderSvr.showLoader = true
    this.incomeSvr.getIncomes().subscribe((res: any) => {
      this.incomes = res
      this.loaderSvr.showLoader = false
    }, (err: any) => {
      this.toast.presentToast('Что-то пощло не так!', 'danger')
      this.loaderSvr.showLoader = false
    })
  }

  handleRefresh(e: any) {
    this.incomeSvr.getIncomes().subscribe((res: any) => {
      this.incomes = res
      e.target.complete();
    }, (err: any) => {
      this.toast.presentToast('Не удалось обновить данные!', 'danger')
    })

  }

}
