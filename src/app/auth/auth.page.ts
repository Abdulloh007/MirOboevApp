import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ToastService } from '../api/toast.service';
import { LoaderService } from '../api/loader.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  login = ""
  password = ""
  action: string = ''
  handlingServer: string = ''
  serverList: any[] = []

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private loaderSvr: LoaderService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) this.router.navigate(['/home']);
    if (localStorage.getItem('activeServer') === null) {
      this.setAction('SELECT_SERVER');
    } else this.setAction('USER_AUTH');
    this.serverList = JSON.parse(localStorage.getItem('serverList') || '[]')
  }

  loginUser(e: any = null) {
    if (e !== null && e !== undefined) {
      e.target.blur()
    }
    this.loaderSvr.showLoader = true
    this.authService.login(this.login, this.password).subscribe((data: any) => {
      localStorage.setItem('account', data.account);
      localStorage.setItem('token', this.authService.UTF8TextToBase64(this.login + ':' + this.password));
      this.loaderSvr.showLoader = false
      this.router.navigate(['/home']);
    }, (error: any) => {
      this.toast.presentToast(error.status.toString() + ' ' + error?.error?.text + ' ' + environment.api, 'danger');
      this.loaderSvr.showLoader = false
    });
  }

  setServerBase(server: string) {
    localStorage.setItem('activeServer', server)
    this.setAction('USER_AUTH')
  }

  setAction(action: string) {
    this.action = action
  }

  newServer() {
    this.setAction('SERVER_HANDLING')
  }

  saveServer() {
    if (this.handlingServer === '') return
    this.serverList.push(this.handlingServer);
    localStorage.setItem('serverList', JSON.stringify(this.serverList))
    this.serverList = JSON.parse(localStorage.getItem('serverList') || '[]')

    this.setServerBase(this.handlingServer);
    this.handlingServer = '';
  }

  removeServer(server: string) {
    this.serverList = this.serverList.filter((item: any) => item !== server)
    localStorage.setItem('serverList', JSON.stringify(this.serverList))
    this.serverList = JSON.parse(localStorage.getItem('serverList') || '[]')
  }

  currentServer() {
    return localStorage.getItem('activeServer')
  }
}
