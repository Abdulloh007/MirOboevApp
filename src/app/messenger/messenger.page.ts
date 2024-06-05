import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatsService } from '../api/chats.service';
import { ToastService } from '../api/toast.service';
import { LoaderService } from '../api/loader.service';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.page.html',
  styleUrls: ['./messenger.page.scss'],
})
export class MessengerPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  chats: any[] = []
  showSelection: boolean = false
  newChat: any = {
    type: 'private',
    members: [],
    title: ''
  }
  users: any[] = []

  constructor(
    private chatSvr: ChatsService,
    private toast: ToastService,
    private loaderSvr: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loaderSvr.showLoader = true
    this.chatSvr.getChats().subscribe((res: any) => {
      this.chats = res
      this.loaderSvr.showLoader = false
    }, err => {
      this.toast.presentToast('Не удалось загрузить данные!', 'warning')
      this.loaderSvr.showLoader = false
    })
    this.chatSvr.getUsers().subscribe((res: any) => {
      this.users = res
    }, err => {
      this.toast.presentToast('Не удалось загрузить пользователей!', 'warning')
    })
  }

  handleRefresh(e: any) {
    this.chatSvr.getChats().subscribe((res: any) => {
      this.chats = res
      e.target.complete();
    }, (err: any) => {
      this.toast.presentToast('Не удалось загрузить данные!', 'danger')
      e.target.complete();
    })

  }

  cancel() {
    this.showSelection = false
    this.newChat.type = 'private'
    this.newChat.members = []
  }

  confirm() {
    this.loaderSvr.showLoader = true
    this.chatSvr.createChat(this.newChat).subscribe((res: any) => {
      this.modal.dismiss()
      this.router.navigate(['/messenger/chat'], {queryParams: {id: res.id}})
    }, (err: any) => {
      this.toast.presentToast('Не удалось создать чат!', 'danger')
      this.modal.dismiss()
    }, () => this.loaderSvr.showLoader = false)
  }

  setShowSelection(chatType: string) {
    this.showSelection = true
    this.newChat.type = chatType
  }

  isChecked(value: string) {
    return this.newChat.members.find((item: any) => item === value);
  }

  checkboxChange(ev: any) {
    const { checked, value } = ev.detail;

    if (checked) {
      if (this.newChat.type === 'group') this.newChat.members = [...this.newChat.members, value]; 
      else if (this.newChat.type === 'private') this.newChat.members = [value]; 
    } else {
      this.newChat.members = this.newChat.members.filter((item: any) => item !== value);
    }
    
  }
}
