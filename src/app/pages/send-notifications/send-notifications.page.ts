import { Component, OnInit } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';
import { Page } from 'src/app/core/scripts/page';
import { DataService } from 'src/app/core/services/data/data.service';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';
import { RefreshWatcherService } from 'src/app/core/services/refresh/refresh-watcher.service';
import { AddNotificationPage } from '../add-notification/add-notification.page';

@Component({
  selector: 'app-send-notifications',
  templateUrl: './send-notifications.page.html',
  styleUrls: ['./send-notifications.page.scss'],
})
export class SendNotificationsPage implements OnInit {  errorView: boolean=false;
  emptyView: boolean=false;
  stopLoading:boolean = true;
  isLoading:boolean=true;
  skip: number=0;
  searchText:string='';
  users:any[]=[];
  subscription:Subscription|undefined
   constructor(
    private helpers:HelpersService,
    private data:DataService,
    private refreshWatcher:RefreshWatcherService,
    private modalCtrl:ModalController

  ) { }

  ngOnInit(
  ) {
    this.getData()
    this.subscription = this.refreshWatcher.refreshObservable.subscribe(
      page=>{
        if (page === Page.SendNotifications){
          this.getData();
        }
      }
    )
  }
  navigate(page:string,dir:string,path?:string){

    this.helpers.navigate(page,dir,path)
  }
  //////////////////////////////////////////////////////////////////
navBack(){
  this.helpers.navBack()
}
sendNotificationModal(student:any){}
getEndpointAttend() {
  let endPoint = `/users?skip=${this.skip}`;
  if(this.searchText.trim() != '') endPoint +=`&phone=${this.searchText}`;

  return endPoint;
}
  /////////////////////////////////////////////////////////////////////////
  handleSearchText(ev: any) {
    this.getData(ev);
  }
  /////////////////////////////////////////////////////////////////////////
  getDataAgain(ev:any ){
    if (ev.target.value===''){
      this.getData(ev)
    }
  }

  getData(ev?:any){
    this.data.getData(this.getEndpointAttend()).subscribe(
      (res:any)=>{
        this.users = this.skip ? this.users.concat(res) : res;
        this.users.length? this.showContentView(ev) : this.showEmptyView(ev);
        this.stopLoading = res?.length != 20;
      },
      (err:any)=>{
        this.showErrorView(ev)
      }
    )
  }
  /////////////////////////////////////////////////////////////////////////
async openSendNotificationModal(user:User){
  const options : ModalOptions ={
    component:AddNotificationPage,
    componentProps:{
      user:user
    }
  }

  const modal = await this.modalCtrl.create(options);
  await modal.present();
}

  // #############################################################
  doRefresh(ev: any): void {
    this.skip = 0;
    this.getData(ev)
  }
//////////////////////////////////////////////////////////////////

loadData(ev:any){
    this.skip +=20;
    this.getData(ev)
}

// #############################################################
   showContentView(ev: any): void {
    this.isLoading = false;
    this.errorView = false;
    this.emptyView = false;
    this.stopLoading = true;
    if (ev) ev.target.complete();
  }
// #############################################################
  showErrorView(ev: any): void {
    this.isLoading = false;
    this.errorView = true;
    this.emptyView = false;
    this.stopLoading = true;
    if (ev) ev.target.complete();
  }
// #############################################################
  showEmptyView(ev: any): void {
    this.isLoading = false;
    this.errorView = false;
    this.emptyView = true;
    this.stopLoading = true;
    if (ev) ev.target.complete();
  }
  //  #############################################################;
}
