import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './api/loader.service';
import { Role } from './interfaces/Role';
import { environment } from 'src/environments/environment';
import { AppService } from './api/app.service';
import { Geolocation } from '@capacitor/geolocation';
import { CheckPermissionService } from './api/check-permission.service';
import { PushNotifyService } from './api/push-notify.service';
import { Capacitor } from '@capacitor/core';
import { PrintersService } from './api/printers.service';
import { ToastService } from './api/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  userAccount: string = 'Меню'
  userRole: Role = {
    name: '',
    degree: 99999
  }

  constructor(
    private router: Router,
    public loaderSvr: LoaderService,
    private appSrv: AppService,
    private checkSecSrv: CheckPermissionService,
    private pushNotifySrv: PushNotifyService,
    private printerSrv: PrintersService,
    private toast: ToastService
    ) {}

  ngOnInit(): void {
    if (Capacitor.isNativePlatform()) {
      this.pushNotifySrv.addListeners()
      this.pushNotifySrv.registerNotifications()
    }

    if (!localStorage.getItem('token')) {
      this.router.navigate(['/auth'])
    }

    if (localStorage.getItem('account')) this.userAccount = localStorage.getItem('account') || 'Меню'
    if (localStorage.getItem('role')) this.userRole = JSON.parse(localStorage.getItem('role') || JSON.stringify(this.userRole)) 
    if (localStorage.getItem('version') !== environment.version && localStorage.getItem('account')) {
      this.appSrv.setAppVersion().subscribe(res => {
        localStorage.setItem('version', environment.version)
      })
    }
    
    this.pushNotifySrv.setPushToken(localStorage.getItem('pushToken') || '').subscribe()
    this.printerSrv.getPrinters().subscribe((res: any) => localStorage.setItem('serverPrinters', JSON.stringify(res)))
    this.getLocation()
  }

  exitAccount() {
    localStorage.removeItem('activeServer')
    localStorage.removeItem('token')
    localStorage.removeItem('orderDraft')
    localStorage.removeItem('account')
    localStorage.removeItem('role')
    localStorage.removeItem('version')
    location.reload() 
  }
  
  async getLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
  
    console.log('Current position:', coordinates);

    this.checkSecSrv.sendLocation(coordinates.coords).subscribe()
  };
}
