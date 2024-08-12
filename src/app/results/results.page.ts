import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../api/results.service';
import { LoaderService } from '../api/loader.service';
import { ToastService } from '../api/toast.service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';
import { Role } from '../interfaces/Role';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  segmentValue: string = 'day'
  showBy: string = 'prods'

  userRole: Role = {
    name: '',
    degree: 99999
  }

  login = ""
  password = ""
  isPemited = false

  date1: string = new Date().toISOString()
  date2: string = new Date().toISOString()

  results: any = {
    products: [],
    products_total: 0,
    docs: [],
    docs_total: 0
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private resultsSrv: ResultsService,
    private loaderSrv: LoaderService,
    private toast: ToastService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('role')) this.userRole = JSON.parse(localStorage.getItem('role') || JSON.stringify(this.userRole)) 
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
      this.toast.presentToast('Не удалось загрузить данные', 'warning')
    })
  }

  loginUser(e: any = null) {
    if (e !== null && e !== undefined) {
      e.target.blur()
    }
    this.loaderSrv.showLoader = true
    this.authService.login(this.login, this.password).subscribe((data: any) => {
      localStorage.setItem('account', data.account);
      localStorage.setItem('token', this.authService.UTF8TextToBase64(this.login + ':' + this.password));
      localStorage.setItem('role', JSON.stringify(data.role));

      this.loaderSrv.showLoader = false
      this.isPemited = true
    }, (error: any) => {
      this.toast.presentToast(error.status.toString() + ' ' + error?.error?.text + ' ' + environment.api, 'danger');
      this.loaderSrv.showLoader = false
    });
  }

  getCustomPeriod() {
    console.log(this.date1);
    console.log(this.date2);
    
    this.loaderSrv.showLoader = true
    this.resultsSrv.getResultsCustomPeriod(this.segmentValue, this.date1.replace(/-/g, '').replace(/:/g, '').replace(/T/g, '').slice(0, 14), this.date2.replace(/-/g, '').replace(/:/g, '').replace(/T/g, '').slice(0, 14)).subscribe((res: any) => {
      this.results.products = res.products
      this.results.products_total = res.products_total
      this.results.docs = res.docs
      this.results.docs_total = res.docs_total
      this.loaderSrv.showLoader = false
    }, err => {
      this.loaderSrv.showLoader = false
      this.toast.presentToast('Не удалось загрузить данные', 'warning')
    })
  }
  
}
