import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ChatsService } from 'src/app/api/chats.service';
import { LoaderService } from 'src/app/api/loader.service';
import { ToastService } from 'src/app/api/toast.service';
import { Chat } from 'src/app/interfaces/Chat';
import { Message, NewMessage } from 'src/app/interfaces/Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('content') private content: any;
  @ViewChild('file') private file!: ElementRef;

  reader = new FileReader();
  activeServer: string = ''

  me: any
  chat: Chat = {
    id: '',
    avatar: null,
    companions: [],
    status: '',
    title: '',
    type: '',
    members: [],
    me: {
      name: ''
    }
  }
  recivedMonthList: any[] = []
  messages: Message[] = []
  message: NewMessage = {
    text: '',
    file: ''
  }
  chatInterval: any

  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private chatsSvr: ChatsService,
    private loaderSvr: LoaderService
  ) { }

  ngOnInit() {
    let gapStr = localStorage.getItem('activeServer')?.split('/')
    this.activeServer = gapStr ? `${gapStr[0]}//${gapStr[2]}` : ''
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.loaderSvr.showLoader = true
        this.chatsSvr.getChat(params.id).subscribe((res: any) => {
          this.chat = res
          this.me = this.chat.me
          this.getMessages(params.id, new Date().getFullYear(), new Date().getMonth(), true, true)
          if (this.messages.length == 0) this.getMessages(params.id, new Date().getFullYear(), new Date().getMonth() - 1, true, true, false)
          this.chatInterval = setInterval(() => this.getMessages(params.id, new Date().getFullYear(), new Date().getMonth(), false, true, false), 5000)
        }, err => {
          this.toast.presentToast('Не удалось загрузить данные!', 'warning')
          this.loaderSvr.showLoader = false
        })

      }
    })

    this.reader.onload = () => {
      this.message.file = this.reader.result;
    };
    this.reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  ngOnDestroy() {
    clearInterval(this.chatInterval)
  }

  sendMessage() {
    const sendingMsg = this.message
    this.messages.push({
      id: 0,
      date: new Date(),
      status: 'Sending',
      is_my: true,
      text: sendingMsg.text,
      user: this.me?.name,
      file: sendingMsg.file,
      file_name: sendingMsg.file_name,
      file_type: sendingMsg.file_type
    })
    this.message = {
      text: '',
      file: '',
      file_name: '',
      file_type: ''
    }
    this.scrollToBottom()
    this.chatsSvr.createMessage({
      id: this.chat.id,
      text: sendingMsg.text,
      file: sendingMsg.file.split('base64,')[1],
      file_name: sendingMsg.file_name,
      file_type: sendingMsg.file_type
    }).subscribe((res: any) => {
      let currentMessage = this.messages?.find(item => (item.user == this.me?.name && item.is_my == true && item.text == sendingMsg.text))
      if (currentMessage) {
        currentMessage.status = 'Unreaded'
        currentMessage.id = res.id
      }
    })
  }

  handleRefresh(e: any) {
    if (this.recivedMonthList[0].month - 1 === 0) {
      this.getMessages(this.chat.id, this.recivedMonthList[0].year - 1, 12)
    } else {
      this.getMessages(this.chat.id, this.recivedMonthList[0].year, this.recivedMonthList[0].month - 2)
      console.log(this.recivedMonthList[0]);

    }
    e.target.complete();
  }

  scrollToBottom() {
    this.content.scrollToBottom(500);
  }

  markReaded() {
    let unreadedMessages = this.messages?.filter(item => (item.status === "Unreaded" && !item.is_my)) || []

    unreadedMessages.forEach(item => {
      this.chatsSvr.updateMessage({
        id: this.chat.id,
        message_id: item.id,
        message_status: 1,
        text: item.text
      }).subscribe()
    })
  }

  getMessages(id: string, year: number, month: number, scrollToBottom = false, markReaded = false, showLoader = true) {
    // console.log(!this.recivedMonthList.find(item => (item.year === year && item.month === month)) || (year === new Date().getFullYear() && month === new Date().getMonth()));

    if (!this.recivedMonthList.find(item => (item.year === year && item.month === month)) || (year === new Date().getFullYear() && month === new Date().getMonth())) {
      if (showLoader) this.loaderSvr.showLoader = true
      this.chatsSvr.getMessage({
        id: id,
        year: year,
        month: month + 1
      }).subscribe((res: any) => {

        let gapList = this.messages

        res.messages.forEach((item: Message) => {
          let selectedMessage = gapList.find(msg => msg.id == item.id)
          let msgIds = gapList.map(item => item.id)
          if (!selectedMessage) gapList.push(item)
          else if (selectedMessage !== item) {
            gapList[msgIds.indexOf(item.id)].text = item.text
            gapList[msgIds.indexOf(item.id)].status = item.status
          }
        })

        gapList.sort((a, b) => new Date(a.date).getDate() - new Date(b.date).getDate())
        gapList.sort((a, b) => new Date(a.date).getMonth() - new Date(b.date).getMonth())
        gapList.sort((a, b) => new Date(a.date).getFullYear() - new Date(b.date).getFullYear())

        this.messages = gapList
        this.recivedMonthList.push({
          year: res.year,
          month: res.month
        })
        this.recivedMonthList = this.recivedMonthList.sort((a, b) => a.month - b.month)
        this.recivedMonthList = this.recivedMonthList.sort((a, b) => a.year - b.year)
        if (showLoader) this.loaderSvr.showLoader = false
        if (scrollToBottom) this.scrollToBottom()
        if (markReaded) this.markReaded()
      }, err => {
        this.toast.presentToast('Не удалось загрузить данные!', 'warning')
        if (showLoader) this.loaderSvr.showLoader = false
      })
    }
  }

  selectFile() {
    this.file.nativeElement.click()
  }

  async onFileChange() {
    this.reader.readAsDataURL(this.file.nativeElement.files[0]);
    this.message.file_type = this.file.nativeElement.files[0].type
    this.message.file_name = this.file.nativeElement.files[0].name
  }

}
