import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PinService } from 'src/app/api/pin.service';
import { ToastService } from 'src/app/api/toast.service';

@Component({
  selector: 'app-sequrity-set-pin',
  templateUrl: './sequrity-set-pin.page.html',
  styleUrls: ['./sequrity-set-pin.page.scss'],
})
export class SequritySetPinPage implements OnInit {

  password: string = ''

  constructor(
    private pinSrv: PinService,
    private toast: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  addChar(char: string | number) {
    if (this.password.length < 6) {
      this.password = this.password + char
    }
    if (this.password.length == 6) {
      this.pinSrv.setPin(this.password).subscribe(res => {
        this.toast.presentToast('ПИН код был успешно изменён!', 'success')
        this.password = ''
        this.router.navigateByUrl('/settings')
        // localStorage.setItem(btoa('pin'), btoa(this.password))
      })
    } 
  }

  removeChar() {
    this.password = this.password.slice(0, this.password.length - 1)
  }



}
