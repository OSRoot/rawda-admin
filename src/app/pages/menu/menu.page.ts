import { Component, OnInit } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { Dir } from 'src/app/core/interfaces/directions';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  dir=Dir;
  contacts: any;

  constructor(
    private helpers:HelpersService,
    private auth:AuthService,
    private data:DataService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit(
  ) {
  return true
  }
  navigate(page:string,dir:string,path?:string){

    this.helpers.navigate(page,dir,path)
  }
  //////////////////////////////////////////////////////////////////
navBack(){
  this.helpers.navBack()
}


async saveContactsInfoModal(){
    const options:ModalOptions ={
      component:SettingsPage,
      componentProps :{
        contacts:this.contacts
      }
    }
    const modal = await this.modalCtrl.create(options);
    await modal.present()
}

async logout(): Promise<void>{
  const confirmed = await this.helpers.GenericAlertConfirm({});
  if (confirmed.role==='confirm'){
    this.auth.logOut();
    }else{
      return
    }

  };

getContactInfo(){
  this.data.getData('/support').subscribe(
    res=>{
      this.contacts = res;
    }
  )
}
}
