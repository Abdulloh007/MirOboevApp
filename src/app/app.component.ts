import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './api/loader.service';
import { Role } from './interfaces/Role';
import { environment } from 'src/environments/environment';
import { AppService } from './api/app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  userAccount: string = 'Меню'
  userRole: Role = {
    name: '',
    degree: 0
  }

  constructor(
    private router: Router,
    public loaderSvr: LoaderService,
    private appSrv: AppService
    ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth'])
    }
    if (localStorage.getItem('account')) this.userAccount = localStorage.getItem('account') || 'Меню'
    if (localStorage.getItem('role')) this.userRole = JSON.parse(localStorage.getItem('role') || JSON.stringify(this.userRole)) 
    if (localStorage.getItem('version') !== environment.version) {
      this.appSrv.setAppVersion().subscribe(res => {
        localStorage.setItem('version', environment.version)
      })
    }
  }

  exitAccount() {
    localStorage.removeItem('activeServer')
    localStorage.removeItem('token')
    localStorage.removeItem('orderDraft')
    localStorage.removeItem('account')
    localStorage.removeItem('role')
    location.reload() 
  }
  
}
