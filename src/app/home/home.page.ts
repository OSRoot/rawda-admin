import { Component, OnInit } from '@angular/core';
import { HomeMenu } from '../core/interfaces/home-menu';
import { Platform } from '@ionic/angular';
import { AuthService } from '../core/services/auth/auth.service';
import { DataService } from '../core/services/data/data.service';
import { HelpersService } from '../core/services/helpers/helpers.service';
import { Storage } from '@ionic/storage-angular';
import { Dir } from '../core/interfaces/directions';
import { StatusBar, StatusBarStyle } from '@capacitor/status-bar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user : any = {};
  users:any[]=[]
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
  ) {
    // this.checkActive()
    this.setStatuBar();
  }

  ngOnInit(): any {
    this.getUsers()
    // return true

  }
  // async checkActive(){
  //   this.data.getData('/users/activation').subscribe(
  //     async (res)=>{
  //       if (res.active){
  //         this.getUser();
  //         return
  //       }
  //       else{
  //         const comfirmed = await this.helpers.GenericAlertConfirm({
  //           header:'معلومة',
  //           message:'الحساب معطل برجاء الإتصال بنا',
  //           buttons:[
  //             {text:'اغلاق',role:'confirm'},
  //           ]
  //         });
  //         if (comfirmed.role==='confirm'|| comfirmed.role === 'backdrop'){
  //           this.auth.logOut()
  //         }
  //       }
  //     },
  //     err=>{
  //       console.log(err);


  //     }
  //   )
  // }

  async getUser(){
    this.user =await  this.storage.get('user');
    console.log(this.user);

  }

  getUsers(){
    this.data.getData('/users?skip=0').subscribe(
      (res:any)=>{
          this.users = res;
      }
    )
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
  ionViewWillEnter(){
    if (!this.platform.is('android') && !this.platform.is("ios"))  return
    // console.log(this.platform.is("android"));

    StatusBar.setStyle({ style: StatusBarStyle.Light });
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setBackgroundColor({ color: '#FFFFFF' });
  }

  ionViewWillLeave(){
    if (!this.platform.is('android') && !this.platform.is("ios"))  return
    // console.log(this.platform.is("android"));

    StatusBar.setStyle({ style: StatusBarStyle.Dark });
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setBackgroundColor({ color: '#2FBFA0' });
  }
  // Handle the statusbar color after leaving the home menu

  // Handle the statusbar color when entering the home menu
  setStatuBar(): void {
    // don't excute this in browser or desktop pwa
    if (!this.platform.is('android') && !this.platform.is("ios"))  return
    // console.log(this.platform.is("android"));

    StatusBar.setStyle({ style: StatusBarStyle.Light });
    StatusBar.setOverlaysWebView({ overlay: false });
    StatusBar.setBackgroundColor({ color: '#FFFFFF' });
  }

}
