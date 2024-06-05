import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../api/results.service';
import { LoaderService } from '../api/loader.service';
import { ToastService } from '../api/toast.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  segmentValue: string = 'day'
  showBy: string = 'prods'
  
  results: any = {
    products: [],
    products_total: 0,
    docs: [],
    docs_total: 0
  }

  constructor(
    private resultsSrv: ResultsService,
    private loaderSrv: LoaderService,
    private toats: ToastService
  ) { }

  ngOnInit() {
    this.onPeriodSegmentChange()
  }

  onPeriodSegmentChange() {
    this.loaderSrv.showLoader = true
    this.resultsSrv.getResults(this.segmentValue).subscribe((res: any) => {
      this.results.products = res.products
      this.results.products_total = res.products_total
      this.results.docs = res.docs
      this.results.docs_total = res.docs_total
      this.loaderSrv.showLoader = false
    }, err => {
      this.loaderSrv.showLoader = false
      this.toats.presentToast('Не удалось загрузить данные', 'warning')
    })
  }
}
