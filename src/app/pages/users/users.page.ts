import { Component, OnDestroy, OnInit } from '@angular/core';
import { PopoverController, PopoverOptions } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';
import { Page } from 'src/app/core/scripts/page';
import { DataService } from 'src/app/core/services/data/data.service';
import { HelpersService } from 'src/app/core/services/helpers/helpers.service';
import { RefreshWatcherService } from 'src/app/core/services/refresh/refresh-watcher.service';
import { UsersOptionsPage } from '../users-options/users-options.page';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {
  errorView: boolean = false;
  emptyView: boolean = false;
  isLoading: boolean=true;
  users:any[]=[]
  skip=0;
  searchText:string=''
  stopLoading:boolean = true;
  username:string='';
  isChecked!:boolean
  subscription:Subscription|undefined;
  constructor(
    private data:DataService,
    private helpers:HelpersService,
    private refreshWatcher:RefreshWatcherService,
    private popOver:PopoverController
  ) { }

  ngOnInit(
  ) {
    this.getData()
    this.subscription = this.refreshWatcher.refreshObservable.subscribe(
      page=>{
        if (page === Page.Users){
          this.getData()
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


getEndpoint() {
  let endPoint = `/users?skip=${this.skip}`;
  if (this.searchText.trim() != '') endPoint += `&phone=${this.searchText}`;
  if (this.username.trim() != '') endPoint += `&name=${this.username}`;
  return endPoint;
}
/////////////////////////////////////////////////////////////////////////
loadData(ev: any) {
  if (this.users.length != 0){
    this.skip = 20;
  }
  this.getData(ev);
}
trackByFn(index:number) {
  return index;
}
async showOptions(e:Event,user:User){
  const options:PopoverOptions = {
    component:UsersOptionsPage,
    componentProps:{
      user:user
    }

  }
  const pop = await this.popOver.create(options);
  await pop.present();
}

getData(ev?:any){
  this.data.getData(this.getEndpoint()).subscribe(
    (res:any)=>{
      this.users = this.skip ? this.users.concat(res) : res;
      this.users.length? this.showContentView(ev) : this.showEmptyView(ev);
    },
    (err:any)=>{
      this.showErrorView(ev)
    }
  )
}
async activateAcc(user:User){
  const confirm = await this.helpers.GenericAlertConfirm({})
  if (confirm.role === 'confirm'){
  this.helpers.StartLoading({})
  this.data.updateData('/users/'+user._id,{active:true}).subscribe(
    res=>{
      this.refreshWatcher.refreshPage(Page.Users);
      this.helpers.StopLoading()
      user = res;
    },
    err=>{
      this.helpers.StopLoading()

    }
  )
}
else{
  return;
}
}

async deactivateAcc(user:User){
  const confirm = await this.helpers.GenericAlertConfirm({})
  if (confirm.role === 'confirm'){
  this.helpers.StartLoading({})
  this.data.updateData('/users/'+user._id,{active:false}).subscribe(
    res=>{
      this.refreshWatcher.refreshPage(Page.Users);
      this.helpers.StopLoading()
      user = res;
    },
    err=>{
      this.helpers.StopLoading()

    }
  )
}
else{
  return;
}
}

callPhone(user:User){
  Browser.open({url:'tel:'+user.phone});
}
  /////////////////////////////////////////////////////////////////////////
  HandleSearchInput(ev: any) {
    this.getData(ev);
  }
  /////////////////////////////////////////////////////////////////////////
  getDataAgain(ev:any ){
    if (ev.target.value===''){
      this.getData(ev)
    }
  }

   // #############################################################
   doRefresh(ev: any): void {
    this.skip = 0;
  }
//////////////////////////////////////////////////////////////////


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
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
