import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { RotationService } from '../api/rotation.service';
import { UserRotation } from '../interfaces/User';
import { ToastService } from '../api/toast.service';
import { LoaderService } from '../api/loader.service';
import { Rotation } from '../interfaces/Rotation';

@Component({
  selector: 'app-rotation',
  templateUrl: './rotation.page.html',
  styleUrls: ['./rotation.page.scss'],
})
export class RotationPage implements OnInit {

  userList: UserRotation[] = []
  selectedUser: UserRotation = {
    name: '',
    subdivision: ''
  }
  showUserModal: boolean = false

  rotationList: Rotation[] = []
  selectedRotation: Rotation = {
    id: '',
    name: ''
  }

  constructor(
    private userSvr: UserService,
    private rotationSrv: RotationService,
    private toast: ToastService,
    private loaderSvr: LoaderService
  ) { }

  ngOnInit() {
    this.userSvr.getUsers().subscribe((data: any) => {
      this.userList = data;
    }, (err: any) => this.toast.presentToast('Не удалось загрузить пользователей', 'warning'))
    this.rotationSrv.getRotations().subscribe((data: any) => {
      this.rotationList = data
    }, (err: any) => this.toast.presentToast('Не удалось загрузить шаблоны ротаций', 'warning'))
  }

  handleRefresh(e: any) {
    this.userSvr.getUsers().subscribe((data: any) => {
      this.userList = data;
      e.target.complete();
    }, (err: any) => {
      this.toast.presentToast('Не удалось загрузить пользователей', 'warning')
      e.target.complete();
    })
  }

  selectUser(user: UserRotation) {
    this.selectedUser = user
    this.showUserModal = true
  }

  handleRotationSelect(event: any) {
    this.selectedRotation = this.rotationList.find((item: Rotation) => item.id === event.detail.value) || this.selectedRotation
    console.log(this.rotationList.find((item: Rotation) => item.id === event.detail.value));
    
  }

  confirmModal() {
    if (this.selectedRotation.id === '') return this.toast.presentToast('Выберите ротацию') 
    this.loaderSvr.showLoader = true 
    this.rotationSrv.setUserRotation({user_name: this.selectedUser.name, rotation_id: this.selectedRotation.id}).subscribe((data: any) => {
      this.loaderSvr.showLoader = false
      this.showUserModal = false
      this.toast.presentToast('Пользователь успешно ротирован(а) на ' + this.selectedRotation.name)
      this.selectedUser = {
        name: '',
        subdivision: ''
      }
      this.selectedRotation = {
        id: '',
        name: ''
      }
    }, (err: any) => {
      this.toast.presentToast('Что-то пошло не так!', 'danger')
      this.loaderSvr.showLoader = false
      this.showUserModal = false
    })
    return
  }

  cancelModal() {
    this.showUserModal = false
    this.selectedUser = {
      name: '',
      subdivision: ''
    }
    this.selectedRotation = {
      id: '',
      name: ''
    }
  }
}
