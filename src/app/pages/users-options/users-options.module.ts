import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersOptionsPageRoutingModule } from './users-options-routing.module';

import { UsersOptionsPage } from './users-options.page';
import { UsersPageModule } from '../users/users.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersOptionsPageRoutingModule,
    UsersPageModule

  ],
  declarations: [UsersOptionsPage],
  exports:[UsersOptionsPage]
})
export class UsersOptionsPageModule {}
