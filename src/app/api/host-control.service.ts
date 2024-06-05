import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HostControlService {

  constructor() { }

  defineHost() {
    if (Capacitor.isNativePlatform()) {
      return (localStorage.getItem('activeServer') ? localStorage.getItem('activeServer') : 'http://localhost') + '/hs/api'
    }else {
      return environment.api
    }
  }

  defineChatHost() {
    if (Capacitor.isNativePlatform()) {
      return (localStorage.getItem('activeServer') ? localStorage.getItem('activeServer') : 'http://localhost') + '/hs/msgr'
    }else {
      return environment.chatApi
    }
  }

}
