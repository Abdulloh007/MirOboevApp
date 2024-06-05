import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostControlService } from './host-control.service';
import { Network } from '@capacitor/network';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CheckPermissionService {
  intervvallIds: any[] = []

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService,
    private toastSvr: ToastService
  ) { }

  checkPermission() {
    this.checkPermissionReq()

    this.clearAllIntervals()

    let interval = setInterval(() => {
      this.checkPermissionReq()
    }, 10000)
    this.intervvallIds.push(interval)
    
    this.checkInternetConnection()
  }

  checkPermissionReq() {
    // chpm
    return this.http.get(this.hostControlSvr.defineHost() + '/chpm', {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    }).subscribe(
      (res: any) => {
        localStorage.setItem("permited", res.permited)
        
        if (res.permited) {
          return true
        } else {
          this.exitAccount()
          return false
        }
        
      }
    )
  }

  clearAllIntervals() {
    while (this.intervvallIds.length) {
      clearInterval(this.intervvallIds.pop());
    }
    Network.removeAllListeners()
  }

  checkInternetConnection() {
    let networkStatus = Network.getStatus()
    
    Network.addListener('networkStatusChange', (e) => {
      if (e.connected) {
        return localStorage.setItem(btoa('networkStatus'), `${e.connected}`)
      } else {
        return localStorage.setItem(btoa('networkStatus'), `${e.connected}`)
      }
    })
  }

  sendLocation(coords: any) {
    return this.http.post(this.hostControlSvr.defineHost() + '/chpm', {
      lat: coords?.latitude,
      long: coords?.longitude
    }, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
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
}
