import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessengerPage } from './messenger.page';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: MessengerPage
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessengerPageRoutingModule {}
