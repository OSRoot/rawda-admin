import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNotificationPageRoutingModule } from './add-notification-routing.module';

import { AddNotificationPage } from './add-notification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNotificationPageRoutingModule
  ],
  declarations: [AddNotificationPage]
})
export class AddNotificationPageModule {}
