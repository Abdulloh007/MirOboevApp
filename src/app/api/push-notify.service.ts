import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { HostControlService } from './host-control.service';

@Injectable({
  providedIn: 'root'
})
export class PushNotifyService {

  constructor(
    private http: HttpClient,
    private hostControlSvr: HostControlService
  ) { }

  async addListeners() {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
      localStorage.setItem('pushToken', token.value)
      
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });
  }

  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
  
    await PushNotifications.register();
  }
  
  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }
  
  setPushToken(value: string) {
    return this.http.post(this.hostControlSvr.defineHost() + '/push_tkn', {
      push_token: value
    }, {
      headers: {
        'Content-Type': 'application/json, charset=utf-8',
        'Accept': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      }
    })
  }
  
}
