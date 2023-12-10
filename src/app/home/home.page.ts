import { Component } from '@angular/core';
import { HomeMenu } from '../core/interfaces/home-menu';
import { Platform } from '@ionic/angular';
import { AuthService } from '../core/services/auth/auth.service';
import { DataService } from '../core/services/data/data.service';
import { HelpersService } from '../core/services/helpers/helpers.service';
import { Storage } from '@ionic/storage-angular';
import { Dir } from '../core/interfaces/directions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user : any = {}
  Dir=Dir;

  homeMenu: HomeMenu[] = [

    {
      icon: 'notifications',
      title: 'إرسال إشعارات',
      path: 'send-notifications',
    },
    {
      icon: 'people',
      title: 'المستخدمون',
      path: 'users',
    },
    {
      icon: 'help-circle',
      title: 'الإقتراحات',
      path: 'suggestions',
    },

  ];
  constructor(
    private platform: Platform,
    private helpers: HelpersService,
    private auth:AuthService,
    private data:DataService,
    private storage:Storage
  ) {}

  async checkActive(){
    this.data.getData('/users/activation').subscribe(
      async (res)=>{
        if (res.active){
          this.getUser()
          return
        }
        else{
          const comfirmed = await this.helpers.GenericAlertConfirm({
            header:'معلومة',
            message:'الحساب معطل برجاء الإتصال بنا',
            buttons:[
              {text:'اغلاق',role:'confirm'},
            ]
          });
          if (comfirmed.role==='confirm'|| comfirmed.role === 'backdrop'){
            this.auth.logOut()
          }
        }
      },
      err=>{
        console.log(err);


      }
    )
  }

  async getUser(){
    this.user =await  this.storage.get('user')
  }


  navigate(page: string, dir: string, path?: string) {
    this.helpers.navigate(page, dir, path);
  }

  doRefresh(ev:any){
    setTimeout(() => {
      document.location.reload();
      ev.target.complete();
    }, 500);
  }
}
