import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
})
export class MonitoringComponent  implements OnInit {
  segmentValue:  string = 'sends'

  constructor() { }

  ngOnInit() {}

  onPeriodSegmentChange() {
    // this.loaderSrv.showLoader = true
    // this.resultsSrv.getResults(this.segmentValue).subscribe((res: any) => {
    //   this.results.products = res.products
    //   this.results.products_total = res.products_total
    //   this.results.docs = res.docs
    //   this.results.docs_total = res.docs_total
    //   this.loaderSrv.showLoader = false
    // }, err => {
    //   this.loaderSrv.showLoader = false
    //   this.toats.presentToast('Не удалось загрузить данные', 'warning')
    // })
  }
}
