import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNotificationPage } from './add-notification.page';

const routes: Routes = [
  {
    path: '',
    component: AddNotificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNotificationPageRoutingModule {}
