import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user.interface';
import { DataService } from 'src/app/core/services/data/data.service';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';
import { RefreshWatcherService } from 'src/app/core/services/refresh/refresh-watcher.service';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.page.html',
  styleUrls: ['./add-notification.page.scss'],
})
export class AddNotificationPage implements OnInit {
  @Input() user!:User
  form!:FormGroup
  constructor(
    private refreshWatcher:RefreshWatcherService,
    private modalCtrl : ModalController,
    private helpers:HelpersService,
    private data:DataService,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title:['', Validators.required],
      message:['', Validators.required],
    })
  }

  navBack(){
    this.helpers.navBack()
  }

  navigate(page:string,dir:string,path?:string){
    this.helpers.navigate(page,dir,path)
  }

  dismiss(){

  }


  async sendNotification(){
    const confirm = await this.helpers.GenericAlertConfirm({});
    if (confirm.role==='confirm'){

    }
  }

}
