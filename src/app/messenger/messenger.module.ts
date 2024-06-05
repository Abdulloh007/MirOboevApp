import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessengerPageRoutingModule } from './messenger-routing.module';

import { MessengerPage } from './messenger.page';
import { TabbbarPageModule } from '../tabbbar/tabbbar.module';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessengerPageRoutingModule,
    TabbbarPageModule
  ],
  declarations: [MessengerPage, ChatComponent]
})
export class MessengerPageModule {}
