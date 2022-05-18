import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SegureMessageChatPageComponent } from './pages/segure-message-chat.page/segure-message-chat.page.component';
import { SecureMessagePage } from './secure-message.page';

const routes: Routes = [
  {
    path: '',
    component: SecureMessagePage,
  },
  {
    path: 'conversation',
    component: SegureMessageChatPageComponent,
  }
];

const imports = [RouterModule.forChild(routes)];
const exports = [RouterModule];

@NgModule({ imports, exports })
export class SecureMessageRoutingModule {}
