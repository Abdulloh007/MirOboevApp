import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ToastService } from '../api/toast.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  login = ""
  password = ""

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('token')) this.router.navigate(['/home']);
  }

  loginUser() {
    this.authService.login(this.login, this.password).subscribe((data: any) => {
      localStorage.setItem('token', this.authService.UTF8TextToBase64(this.login + ':' + this.password));
      this.router.navigate(['/home']);
    }, (error: any) => {
      this.toast.presentToast(error.status.toString() + ' ' + error?.error?.text + ' ' + environment.api, 'danger');
      
    });
  }

}
